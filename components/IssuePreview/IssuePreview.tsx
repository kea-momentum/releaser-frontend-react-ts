import * as S from "./IssuePreview.styled";
import { ISSUE_WRITER_PROFILE, MODAL_STYLE } from "@/constants";
import Profile from "../Profile";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate, Alert } from "@/util";
import Tag from "../Tag";
import { IssueData, IssueDataForEdit } from "@/types/issue";
import { deleteIssue, getEachIssue } from "@/api";
import { useRouter } from "next/router";
import IssueModal from "../IssueModal";
import Link from "next/link";
import { useLocation } from "react-router-dom";

export default function IssuePreview({
  issueList,
  setIssueId,
  type,
  onDelete,
  index,
  onEdit,
  onPMConfirm,
  releaseDeploy,
}: {
  issueList: IssueData;
  setIssueId?: any;
  type: string;
  onDelete?: (issueId: number) => void;
  index?: number;
  onEdit?: (issueData: IssueData) => void;
  onPMConfirm?: (confirm: boolean, issueId: number) => void;
  releaseDeploy?: boolean;
}) {
  const location = useLocation();

  console.log(issueList);
  const router = useRouter();
  const projectIdRouter = router.query.id;

  const [isDeploy, setIsDeploy] = useState<number>();
  useEffect(() => {
    // TODO: 지울거
    console.log(">>> Issue List\n", issueList);
    console.log(">>> IsDeploy: ", releaseDeploy);
  }, []);

  useEffect(() => {
    if (issueList.deployYN === "Y" || releaseDeploy === true) {
      setIsDeploy(1);
    } else {
      setIsDeploy(0);
    }
  }, []);

  const onConnect = () => {
    issueList && setIssueId(issueList.issueId);
  };

  const isIssue = type === "Issue" ? 1 : 0;
  const isEdit = issueList.edit === "Y" ? 1 : 0;

  const handleDelete = (issueId: number) => {
    Alert.question("정말로 이슈를 삭제하시겠습니까?").then(result => {
      if (result.isConfirmed) {
        deleteIssue(issueId).then(response => {
          if (response.isSuccess) {
            Alert.basicMessage("삭제되었습니다.");
            onDelete && onDelete(issueId);
            router.push(`/IssueBoard/${projectIdRouter}`);
          } else {
            Alert.warn("이슈 삭제 실패", response.message);
          }
        });
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAfterEdit = (issueData: IssueData) => {
    onEdit && onEdit(issueData);
    router.push(`/IssueBoard/${projectIdRouter}`);
  };

  const currentPath = location.pathname + location.search;
  const separator = currentPath.includes("?") ? "&" : "?";

  return (
    <S.IssuePreviewBox issue={isIssue} deploy={isDeploy}>
      <S.TopContainer>
        <S.IssueNumber>#{issueList.issueNum}</S.IssueNumber>
        <S.Title issue={isIssue}>{issueList.title}</S.Title>
        <S.RightTop>
          {isDeploy === 0 && <S.ResolvedToggle issue={isIssue} edit={isEdit} />}
          {isDeploy === 0 && type == "Release" && (
            <DisConnect onClick={onConnect} />
          )}
        </S.RightTop>
      </S.TopContainer>

      {type === "Issue" && (
        <S.MiddleContainer>{issueList.content}</S.MiddleContainer>
      )}

      <S.BottomContainer issue={isIssue}>
        <S.BottomLeftContainer>
          <Profile
            source={issueList.memberImg}
            profileType={ISSUE_WRITER_PROFILE}
            profileName={issueList.memberName}
          />
          <S.TagBox>
            <Tag tagText={issueList.tag} />
          </S.TagBox>
          {issueList.endDate && (
            <S.DateBox>
              {formatDate(issueList.endDate)?.shortDateTime}
            </S.DateBox>
          )}
        </S.BottomLeftContainer>

        <S.ButtonContainer>
          <Link
            as={`${currentPath}${separator}issueId=${issueList.issueId}`}
            href={`${currentPath}${separator}issueId=${issueList.issueId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <S.Button>수정</S.Button>
          </Link>
          {Number(router.query.issueId) === issueList.issueId && (
            <S.IssueModal isOpen={!!router.query.issueId} style={MODAL_STYLE}>
              <IssueModal
                onClose={closeModal}
                onSave={editedIssueData => {
                  console.log("Edited Issue Data: ", editedIssueData);
                  handleAfterEdit(editedIssueData);
                }}
                issueId={Number(router.query.issueId)}
                onDelete={issueId => handleDelete(issueId)}
                onPMConfirm={onPMConfirm}
              />
            </S.IssueModal>
          )}
          {type === "Issue" && (
            <S.Button onClick={() => handleDelete(issueList.issueId)}>
              삭제
            </S.Button>
          )}
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

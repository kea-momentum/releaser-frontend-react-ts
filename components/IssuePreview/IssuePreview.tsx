import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import Circle from "@/public/images/Profile.jpg";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceData";
import Tag from "../\bTag";
import { IssueData, IssueDataForEdit } from "@/types/issue";
import { Alert } from "@/util/Alert";
import { deleteIssue, getEachIssue } from "@/api";
import { useRouter } from "next/router";
import { response } from "msw";
import IssueModal from "../IssueModal";
import Link from "next/link";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function IssuePreview({
  issueList,
  setIssueId,
  type,
  onDelete,
  index,
  onEdit,
  onPMConfirm,
}: {
  issueList: IssueData;
  setIssueId?: any;
  type: string;
  onDelete?: (issueId: number) => void;
  index: number;
  onEdit?: (issueData: IssueData) => void;
  onPMConfirm?: (confirm: boolean, issueId: number) => void;
}) {
  const location = useLocation();

  const router = useRouter();
  const projectIdRouter = router.query.id;

  const [isDeploy, setIsDeploy] = useState<boolean>(false);

  useEffect(() => {
    if (issueList.deployYN === "Y") {
      setIsDeploy(true);
    } else {
      setIsDeploy(false);
    }
  }, []);

  const onConnect = () => {
    issueList && setIssueId(issueList.issueId);
  };

  const isIssue = type === "Issue" ? 1 : 0;

  const truncateString = (str: string, maxLenth: number) => {
    if (str.length <= maxLenth) {
      return str;
    }
    return str.substring(0, maxLenth) + " ...";
  };

  const truncatedTitle =
    type === "Issue"
      ? truncateString(issueList.title, 22)
      : truncateString(issueList.title, 18);

  const truncatedContent =
    type === "Issue" ? truncateString(issueList.content, 34) : null;

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
        <S.Title>{truncatedTitle}</S.Title>
        <S.ResolvedToggle edit={isEdit} />
        {type == "Release" && <DisConnect onClick={onConnect} />}
      </S.TopContainer>

      {type === "Issue" && (
        <S.MiddleContainer>{truncatedContent}</S.MiddleContainer>
      )}

      <S.BottomContainer issue={isIssue}>
        <S.BottomLeftContainer>
          <Profile
            source={issueList.memberImg}
            profileType={issueWriterProfile}
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
            <S.IssueModal
              isOpen={!!router.query.issueId}
              style={{
                overlay: {
                  backgroundColor: "rgba(91, 91, 91, 0.55)",
                },
              }}
            >
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
          <S.Button onClick={() => handleDelete(issueList.issueId)}>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

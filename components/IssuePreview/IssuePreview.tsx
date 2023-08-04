import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import Circle from "@/public/images/Profile.jpg";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceDate";
import Tag from "../\bTag";
import { IssueData, IssueDataForEdit } from "@/types/issue";
import { Alert } from "@/util/Alert";
import { deleteIssue, getEachIssue } from "@/api";
import { useRouter } from "next/router";
import { response } from "msw";
import IssueModal from "../IssueModal";
import Link from "next/link";

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
  const router = useRouter();
  const projectIdRouter = router.query.id;

  const [isDeploy, setIsDeploy] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (issueList.deployYN === "Y") {
      setIsDeploy(true);
      setModalType("readOnly");
    } else {
      setIsDeploy(false);
      setModalType("edit");
    }
  }, [issueList.deployYN]);

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
    setEditIssue(false);
  };

  const [editIssue, setEditIssue] = useState<boolean>(false);
  const [issueData, setIssueData] = useState<IssueDataForEdit>();
  const handleEdit = () => {
    setIsModalOpen(true);
    setEditIssue(true);
    getEachIssue(issueList.issueId).then(response => {
      if (response.isSuccess) {
        setIssueData(response.result);
      }
    });
  };

  useEffect(() => {
    if (router.query.issueId) {
      getEachIssue(Number(router.query.issueId)).then(response => {
        if (response.isSuccess) {
          setIssueData(response.result.issueDetails);
          setIsLoading(false);
          if(response.result.pmCheck === "Y") {
            handlePMConfirm(true, Number(router.query.issueId));
          } else { // FIXME: 이거 둬? 말아?
            handlePMConfirm(false, Number(router.query.issueId));
          }
        }
      });
    }
  }, [router.query.issueId]);

  const handlePMConfirm = (confirm: boolean, issueId: number) => {
    onPMConfirm && onPMConfirm(confirm, issueId);
  }

  const handleAfterEdit = (issueData: IssueData) => {
    onEdit && onEdit(issueData);
    router.push(`/IssueBoard/${projectIdRouter}`);
  };

  return (
    <S.IssuePreviewBox
      issue={isIssue}
      deploy={isDeploy}
    >
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
            as={`/IssueBoard/${projectIdRouter}/?issueId=${issueList.issueId}`}
            href={`/IssueBoard/${projectIdRouter}/?issueId=${issueList.issueId}`}
            style={{textDecoration: "none", color: "black"}}
          >
            <S.Button onClick={handleEdit}>수정</S.Button>
          </Link>
            <S.IssueModal
              isOpen={!!router.query.issueId}
              style={{
                overlay: {
                  backgroundColor: "rgba(91, 91, 91, 0.25)",
                },
              }}
            >
              <IssueModal
                onClose={closeModal}
                type={modalType}
                onSave={editedIssueData => {
                  console.log("Edited Issue Data: ", editedIssueData);
                  handleAfterEdit(editedIssueData);
                }}
                issueId={issueList.issueId}
                issueDataForEdit={issueData}
                onDelete={issueId => handleDelete(issueId)}
              />
            </S.IssueModal>
          <S.Button onClick={() => handleDelete(issueList.issueId)}>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

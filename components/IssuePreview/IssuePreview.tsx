import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import Circle from "@/public/images/Profile.jpg";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceDate";
import Tag from "../\bTag";
import { IssueData } from "@/types/issue";
import { Alert } from "@/util/Alert";
import { deleteIssue } from "@/api";

export default function IssuePreview({
  issueList,
  setIssueId,
  type,
  onDelete
}: {
  issueList: IssueData;
  setIssueId?: any;
  type: string;
  onDelete?: (issueId: number) => void;
}) {
  const [enable, setEnable] = useState(false);

  const onConnect = () => {
    issueList && setIssueId(issueList.issueId);
  };
  
  const isIssue = type === "Issue" ? true : false;

  const truncateString = (str: string, maxLenth: number) => {
    if(str.length <= maxLenth) {
        return str;
    }
    return str.substring(0, maxLenth) + " ...";
  };

  const truncatedTitle =
    type === "Issue"
      ? truncateString(issueList.title, 22)
      : truncateString(issueList.title, 18);

  const truncatedContent =
    type === "Issue"
      ? truncateString(issueList.content, 34)
      : null;
  
  const isEdit = issueList.edit === "Y" ? true : false;

  const handleDelete = () => {
    deleteIssue(issueList.issueId);
    // Alert.confirmDelete(
    //     "정말로 이슈를 삭제하시겠습니까?",
    //     "이 프로젝트와 관련한 모든 정보가 삭제됩니다.",
    //     `${process.env.NEXT_PUBLIC_API_URL}/issues/${issueList.issueId}/delete`,
    //     "이슈가 삭제되었습니다.",
    //     "",
    //     onDelete,
    //     issueList.issueId,
    //     "이슈 삭제 실패"
    // );
  };

  return (
    <S.IssuePreviewBox isIssue={isIssue}>
      <S.TopContainer>
        <S.Title>{truncatedTitle}</S.Title>
        <S.ResolvedToggle isEdit={isEdit} />
        {type == "Release" && <DisConnect onClick={onConnect} />}
      </S.TopContainer>
      
      {type === "Issue" && (
        <S.MiddleContainer>
          {truncatedContent}
        </S.MiddleContainer>
      )}

      <S.BottomContainer isIssue={isIssue}>
        <S.BottomLeftContainer>
          <Profile
            source={Circle}
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
          <S.Button>수정</S.Button>
          <S.Button onClick={handleDelete}>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

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
  onDelete,
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

  const handleDelete = () => {
    Alert.question("정말로 이슈를 삭제하시겠습니까?").then(result => {
      if (result.isConfirmed) {
        deleteIssue(issueList.issueId).then(response => {
          if(response.isSuccess) {
            Alert.basicMessage("삭제되었습니다.");
            onDelete && onDelete(issueList.issueId);
          } else {
            Alert.warn("이슈 삭제 실패", response.message);
          }
        })
      }
    });
  };

  return (
    <S.IssuePreviewBox issue={isIssue}>
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
          <S.Button>수정</S.Button>
          <S.Button onClick={handleDelete}>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

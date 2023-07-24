import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import Circle from "@/public/images/Profile.jpg";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceDate";
import Tag from "../\bTag";
export default function IssuePreview({
  connectedIssue,
  setIssueId,
  type,
}: {
  connectedIssue?: any;
  setIssueId: any;
  type?: string;
}) {
  const [enable, setEnable] = useState(false);
  console.log(connectedIssue);

  const onConnect = () => {
    setIssueId(connectedIssue.issueId);
  };

  return (
    <S.IssuePreviewBox>
      <S.TopContainer>
        <S.Title>{connectedIssue.title}</S.Title>
        <S.ResolvedToggle></S.ResolvedToggle>
        {type == "Release" && <DisConnect onClick={onConnect} />}
      </S.TopContainer>
      <S.BottomContainer>
        <S.BottomLeftContainer>
          <Profile
            source={Circle}
            profileType={issueWriterProfile}
            profileName={connectedIssue.memberName}
          />
          <S.TagBox>
            <Tag tagText={connectedIssue.tag} />
          </S.TagBox>
          {connectedIssue.endDate && (
            <S.DateBox>
              {formatDate(connectedIssue.endDate)?.shortDateTime}
            </S.DateBox>
          )}
        </S.BottomLeftContainer>

        <S.ButtonContainer>
          <S.Button>수정</S.Button>
          <S.Button>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

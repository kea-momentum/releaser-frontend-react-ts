import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import Circle from "@/public/images/Profile.jpg";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceDate";
import Tag from "../\bTag";
import { IssueData } from "@/types/issue";
import { TagType } from "@/types/issue";

export default function IssuePreview({
  issueList,
  setIssueId,
  type,
}: {
  issueList: IssueData;
  setIssueId?: any;
  type: string;
}) {
  const [enable, setEnable] = useState(false);

  const onConnect = () => {
    issueList && setIssueId(issueList.issueId);
  };

  return (
    <S.IssuePreviewBox>
      <S.TopContainer>
        <S.Title>{issueList.title}</S.Title>
        <S.ResolvedToggle></S.ResolvedToggle>
        {type == "Release" && <DisConnect onClick={onConnect} />}
      </S.TopContainer>
      <S.BottomContainer>
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
          <S.Button>삭제</S.Button>
        </S.ButtonContainer>
      </S.BottomContainer>
    </S.IssuePreviewBox>
  );
}

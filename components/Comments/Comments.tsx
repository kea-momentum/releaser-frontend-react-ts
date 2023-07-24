import * as S from "./Comments.styled";
import Add from "@/public/images/Add.svg";
import Profile from "../Profile";
import Circle from "../../public/images/Profile.jpg";
import { issueWriterProfile } from "@/constants/profile";
import { useState } from "react";
import { ChangeEventHandler, ChangeEvent } from "react";

const Comment = ({ type, opinion }: { type: string; opinion?: any }) => {
  return (
    <S.CommentBox>
      <S.ProfileContainer>
        <Profile
          source={Circle}
          profileType={issueWriterProfile}
          profileName={opinion.memberName}
        />
      </S.ProfileContainer>
      <S.CommentTitle>{opinion.opinion}</S.CommentTitle>
    </S.CommentBox>
  );
};

export default function Comments({
  type,
  opinions,
}: {
  type: string;
  opinions?: any;
}) {
  const commentSectionStyle =
    type === "release"
      ? { height: "180px", marginTop: "10px" }
      : { height: "150px", marginTop: "6px", marginBottom: "12px" };

  const commentInnerSectionStyle =
    type === "release" ? { height: "176px" } : { height: "146px" };

  return (
    <S.CommentSection style={commentSectionStyle}>
      <S.CommentInnerSection style={commentInnerSectionStyle}>
        <S.CommentContainer>
          <S.AddComment>
            <S.ProfileContainer>
              <Profile
                source={Circle}
                profileType={issueWriterProfile}
                profileName="이도경"
              />
            </S.ProfileContainer>
            <S.CommentInput />
            <S.AddButton />
          </S.AddComment>
          {opinions &&
            opinions.map((op: any) => <Comment type={type} opinion={op} />)}
        </S.CommentContainer>
      </S.CommentInnerSection>
    </S.CommentSection>
  );
}

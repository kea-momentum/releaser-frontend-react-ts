import * as S from "./Comments.styled";
import Profile from "../Profile";
import { issueWriterProfile } from "@/constants/profile";
import { useEffect, useState } from "react";
import * as api from "@/api";
import XIcon from "@/public/images/XIcon.svg";
import { response } from "msw";

export default function Comments({
  user,
  type,
  opinions,
  id,
}: {
  user: any;
  type: string;
  opinions?: any;
  id: number;
}) {
  const [newOpinion, setNewOpinion] = useState("");
  const [newOpinionList, setNewOpinionList] = useState(opinions);

  const commentSectionStyle =
    type === "release"
      ? { height: "180px", marginTop: "10px" }
      : { height: "150px", marginTop: "6px", marginBottom: "12px" };

  const commentInnerSectionStyle =
    type === "release" ? { height: "176px" } : { height: "146px" };

  const onChangeInput = (e: any) => {
    setNewOpinion(e.target.value);
  };
  useEffect(() => {});

  const onClickAdd = () => {
    api.postOpinion({ opinion: newOpinion, releaseId: id }).then(response => {
      setNewOpinionList(response.result);
    });
    setNewOpinion("");
  };

  const onClickDelete = (opinionId: number) => {
    api.deleteOpinion({ opinionId }).then(response => {
      setNewOpinionList(response.result);
    });
  };

  return (
    <S.CommentSection style={commentSectionStyle}>
      <S.CommentInnerSection style={commentInnerSectionStyle}>
        <S.CommentContainer>
          <S.AddComment>
            <S.ProfileContainer>
              <Profile
                source={"e"}
                profileType={issueWriterProfile}
                profileName="이도경"
              />
            </S.ProfileContainer>
            <S.CommentInput
              placeholder="새로운 의견을 작성해주세요"
              value={newOpinion}
              onChange={(e: any) => onChangeInput(e)}
            />
            <S.AddButton onClick={onClickAdd} />
          </S.AddComment>
          {newOpinionList &&
            newOpinionList
              .slice()
              .reverse()
              .map((op: any) => (
                <S.CommentBox>
                  {" "}
                  <S.ProfileContainer>
                    <Profile
                      source={op.memberImg}
                      profileType={issueWriterProfile}
                      profileName={op.memberName}
                    />
                  </S.ProfileContainer>
                  <S.CommentTitle>{op.opinion}</S.CommentTitle>
                  <S.XIconContainer>
                    {user.memberId === op.memberId && (
                      <XIcon
                        onClick={() => onClickDelete(op.releaseOpinionId)}
                      />
                    )}
                  </S.XIconContainer>
                </S.CommentBox>
              ))}
        </S.CommentContainer>
      </S.CommentInnerSection>
    </S.CommentSection>
  );
}

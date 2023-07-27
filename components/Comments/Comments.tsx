import * as S from "./Comments.styled";
import Add from "@/public/images/Add.svg";
import Profile from "../Profile";
import Circle from "../../public/images/Profile.jpg";
import { issueWriterProfile } from "@/constants/profile";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { ChangeEventHandler, ChangeEvent } from "react";

const Comment = ({
  type,
  opinion,
  addedOpinion,
}: {
  type: string;
  opinion?: any;
  addedOpinion?: string;
}) => {
  return (
    <S.CommentBox>
      <S.ProfileContainer>
        {opinion && (
          <Profile
            source={opinion.memberImg}
            profileType={issueWriterProfile}
            profileName={opinion.memberName}
          />
        )}
        {addedOpinion && (
          <Profile
            source={Circle}
            profileType={issueWriterProfile}
            profileName={"이도경"}
          />
        )}
      </S.ProfileContainer>
      {opinion && <S.CommentTitle>{opinion.opinion}</S.CommentTitle>}
      {addedOpinion && <S.CommentTitle>{addedOpinion}</S.CommentTitle>}
    </S.CommentBox>
  );
};

export default function Comments({
  type,
  opinions,
  id,
}: {
  type: string;
  opinions?: any;
  id: number;
}) {
  const [addedOpinionsList, setAddedOpinionsList] = useState<string[]>([]);
  const [newOpinion, setNewOpinion] = useState("");

  const commentSectionStyle =
    type === "release"
      ? { height: "180px", marginTop: "10px" }
      : { height: "150px", marginTop: "6px", marginBottom: "12px" };

  const commentInnerSectionStyle =
    type === "release" ? { height: "176px" } : { height: "146px" };

  const onChangeInput = (e: any) => {
    setNewOpinion(e.target.value);

    console.log(newOpinion);
  };
  useEffect(() => {});

  const onClickAdd = () => {
    setAddedOpinionsList([newOpinion, ...addedOpinionsList]);
    api.postOpinion({ opinion: newOpinion, releaseId: id }).then(response => {
      console.log(response);
    });
    setNewOpinion("");
    console.log(addedOpinionsList);
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
          {addedOpinionsList.map((op: string) => (
            <Comment type={type} addedOpinion={op} />
          ))}
          {opinions &&
            opinions
              .slice()
              .reverse()
              .map((op: any) => <Comment type={type} opinion={op} />)}
        </S.CommentContainer>
      </S.CommentInnerSection>
    </S.CommentSection>
  );
}

import * as S from "./Comments.styled";
import Profile from "../Profile";
import { ISSUE_WRITER_PROFILE } from "@/constants";
import { useEffect, useState, ChangeEvent } from "react";
import * as api from "@/api";
import { UserType, OpinionType, UserProfileType } from "@/types";
import XIcon from "@/public/images/XIcon.svg";

export default function Comments({
  user,
  type,
  opinions,
  id,
}: {
  user: UserType;
  type: string;
  opinions?: OpinionType[];
  id?: number;
}) {
  const [newOpinion, setNewOpinion] = useState("");
  const [newOpinionList, setNewOpinionList] = useState(opinions);
  const [profile, setProfile] = useState<UserProfileType>();
  const [loading, setIsLoading] = useState(true);
  const commentSectionStyle =
    type === "release"
      ? { height: "180px", marginTop: "10px" }
      : { height: "150px", marginTop: "6px", marginBottom: "12px" };

  const commentInnerSectionStyle =
    type === "release" ? { height: "176px" } : { height: "146px" };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewOpinion(e.target.value);
  };

  useEffect(() => {
    api.getUserProfile().then(response => {
      setProfile(response.result);
      setIsLoading(false);
    });
  }, []);

  const onClickAdd = () => {
    if(type === "release") {
      api
        .postOpinion({ opinion: newOpinion, releaseId: id as number })
        .then(response => {
          setNewOpinionList(response.result);
        });
    } else {
      api
        .postIssueOpinion({ opinion: newOpinion, issueId: id as number })
        .then(response => {
          setNewOpinionList(response.result);
        });
    }
    setNewOpinion("");
  };

  const onClickDelete = (opinionId: number) => {
    if(type === "release") {
      api.deleteOpinion({ opinionId }).then(response => {
        setNewOpinionList(response.result);
      });
    } else {
      api.deleteIssueOpinion({opinionId}).then(responsne => {
        setNewOpinionList(responsne.result);
      });
    }
  };

  if (loading) {
    return <div></div>;
  }
  return (
    <S.CommentSection style={commentSectionStyle}>
      <S.CommentInnerSection style={commentInnerSectionStyle}>
        <S.CommentContainer>
          <S.AddComment>
            <S.ProfileContainer>
              {profile && (
                <Profile
                  source={profile.img}
                  profileType={ISSUE_WRITER_PROFILE}
                  profileName={profile.name}
                />
              )}
            </S.ProfileContainer>
            <S.CommentInput
              placeholder="새로운 의견을 작성해주세요"
              value={newOpinion}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
            />
            <S.AddButton onClick={onClickAdd} />
          </S.AddComment>
          {newOpinionList &&
            newOpinionList
              .slice()
              .reverse()
              .map((op: OpinionType) => (
                <S.CommentBox key={op.opinionId}>
                  <S.ProfileContainer>
                    <Profile
                      source={op.memberImg}
                      profileType={ISSUE_WRITER_PROFILE}
                      profileName={op.memberName}
                    />
                  </S.ProfileContainer>
                  <S.CommentTitle>{op.opinion}</S.CommentTitle>
                  <S.XIconContainer>
                    user.memberID: {user.memberId} <br />
                    op.memberID: {op.memberId}
                    {user.memberId === op.memberId && (
                      <XIcon
                        onClick={() => onClickDelete(op.opinionId)}
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

import * as S from "./ReleaseMember.styled";
import Profile from "@/components/Profile";
import Circle from "../../../public/images/Profile.jpg";
import {
  beforeVoteProfile,
  approveVoteProfile,
  disapproveVoteProfile,
} from "@/constants/profile";
import { useEffect } from "react";
import { useState } from "react";
import * as api from "@/api";

const profileType: { [key: string]: any } = {
  Y: approveVoteProfile,
  N: disapproveVoteProfile,
  B: beforeVoteProfile,
};

export default function ReleaseMember({
  projectId,
  releaseType,
  approvals,
}: {
  projectId: string;
  releaseType: any;
  approvals?: any;
}) {
  const [members, setMembers] = useState<any>();
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    if (releaseType === "PM_CREATE") {
      api
        .getProjectMembers(projectId)
        .then(response => {
          setMembers(response.result);
          setIsLoad(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <S.MemberContainer>
      <S.TopContainer>
        <S.Header>릴리즈 참여자</S.Header>
        <S.VotedStatus />
      </S.TopContainer>
      <S.BottomContainer>
        {isLoad &&
          releaseType === "PM_CREATE" &&
          members?.map((member: any) => (
            <Profile
              key={member.userId}
              source={Circle}
              profileType={beforeVoteProfile}
              profileName={member.name}
            />
          ))}
        {releaseType === "PM_EDIT" &&
          approvals.map((approval: any) => (
            <Profile
              key={approval.memberId}
              source={Circle}
              profileType={profileType[approval.approval]}
              profileName={approval.memberName}
            />
          ))}
      </S.BottomContainer>
    </S.MemberContainer>
  );
}

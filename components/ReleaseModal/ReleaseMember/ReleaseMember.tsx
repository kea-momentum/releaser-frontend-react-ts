import * as S from "./ReleaseMember.styled";
import Profile from "@/components/Profile";
import Circle from "@/public/images/Profile.jpg";
import { beforeVoteProfile } from "@/constants/profile";
import { useEffect } from "react";
import { useState } from "react";
import * as api from "@/api";
import { PROFILE_TYPE } from "@/constants/profile";
import { ApprovalsType } from "@/types";

export default function ReleaseMember({
  projectId,
  releaseType,
  approvals,
}: {
  projectId: string;
  releaseType: string;
  approvals?: ApprovalsType[];
}) {
  const [members, setMembers] = useState<any>();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (releaseType === "PM_CREATE") {
      api
        .getProjectMembers(projectId)
        .then(response => {
          setMembers(response.result);
          console.log(response.result);
          setIsLoad(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);
  console.log(approvals);
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
          approvals &&
          approvals.map((approval: ApprovalsType) => (
            <Profile
              key={approval.memberId}
              source={Circle}
              profileType={PROFILE_TYPE[approval.approval]}
              profileName={approval.memberName}
            />
          ))}
      </S.BottomContainer>
    </S.MemberContainer>
  );
}

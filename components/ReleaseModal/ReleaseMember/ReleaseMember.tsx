import * as S from "./ReleaseMember.styled";
import Profile from "@/components/Profile";
import { BEFORE_VOTE_PROFILE } from "@/constants";
import { useEffect } from "react";
import { useState } from "react";
import * as api from "@/api";
import { PROFILE_TYPE, RELEASE_TYPE } from "@/constants";
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
  const approvalNum = approvals?.length;
  const yNum = approvals?.filter(approval => approval.approval === "Y").length;
  const nNum = approvals?.filter(approval => approval.approval === "N").length;
  const pNum = approvals?.filter(approval => approval.approval === "P").length;
  useEffect(() => {
    if (releaseType === RELEASE_TYPE.PM_CREATE) {
      api
        .getProjectMembers(projectId)
        .then(response => {
          setMembers(response.result.memberList);
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
        {releaseType !== RELEASE_TYPE.PM_CREATE && (
          <S.VotedStatus>
            <S.ApproveCircle />
            {yNum}/{approvalNum}
            <S.DisapproveCircle />
            {nNum}/{approvalNum}
            <S.NotYetVotedCircle />
            {pNum}/{approvalNum}
          </S.VotedStatus>
        )}
      </S.TopContainer>
      <S.BottomContainer>
        {isLoad &&
          releaseType === RELEASE_TYPE.PM_CREATE &&
          members?.map((member: any) => (
            <Profile
              key={member.userId}
              source={member.img}
              profileType={BEFORE_VOTE_PROFILE}
              profileName={member.name}
            />
          ))}
        {(releaseType === RELEASE_TYPE.PM_EDIT ||
          releaseType === RELEASE_TYPE.MEM_NOTDEPLOYED) &&
          approvals &&
          approvals.map((approval: ApprovalsType) => (
            <Profile
              key={approval.memberId}
              source={approval.memberProfileImg}
              profileType={PROFILE_TYPE[approval.approval]}
              profileName={approval.memberName}
            />
          ))}
      </S.BottomContainer>
    </S.MemberContainer>
  );
}

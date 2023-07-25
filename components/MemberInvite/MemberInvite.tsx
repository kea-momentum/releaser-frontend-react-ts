import { useEffect } from "react";
import * as S from "./MemberInvite.styled";
import * as api from "@/api";
import { useRouter } from "next/router";
import Profile from "../Profile";
import { beforeVoteProfile, disapproveVoteProfile } from "@/constants/profile";
import Circle from "@/public/images/Profile.jpg";
import { useState } from "react";
export default function MemberInvite({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();
  const [memberList, setMemberList] = useState<any>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const projectId = router.query.id;

  useEffect(() => {
    if (projectId) {
      api.getProjectMembers(projectId as string).then(response => {
        console.log(response);
        setMemberList(response.result);
        setIsLoad(false);
      });
    }
  }, [isLoad, projectId]);

  if (isLoad) {
    return <div>Loading</div>;
  }
  return (
    <>
      <S.MainContainer
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(91, 91, 91, 0.75)",
          },
        }}
      >
        <S.TopHeader>
          <S.HeaderText>그룹 멤버 </S.HeaderText>
        </S.TopHeader>
        <S.BottomContainer>
          <S.MemberContainer>
            <S.MemberSubContainer>
              {memberList.map((member: any) => (
                <S.MemberBox>
                  <S.ImgContainer>
                    <Profile
                      profileType={disapproveVoteProfile}
                      source={member.img}
                    />
                  </S.ImgContainer>

                  {member.name}
                </S.MemberBox>
              ))}
            </S.MemberSubContainer>
          </S.MemberContainer>
        </S.BottomContainer>
      </S.MainContainer>
    </>
  );
}

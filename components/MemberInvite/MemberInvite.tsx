import { SetStateAction, useEffect, Dispatch } from "react";
import * as S from "./MemberInvite.styled";
import * as api from "@/api";
import { useRouter } from "next/router";
import Profile from "../Profile";
import {
  beforeVoteProfile,
  disapproveVoteProfile,
  basicProfile,
} from "@/constants/profile";
import XIcon from "@/public/images/XIcon.svg";
import { useState } from "react";
export default function MemberInvite({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
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

  const onClickClose = () => {
    setIsOpen(false);
  };

  const onClickDeleteMember = (memberId: number) => {
    api.deleteProjectMember(memberId).then(response => {
      console.log(response);
      setMemberList(
        memberList.filter((member: any) => member.memberId !== memberId),
      );
    });
  };

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
          <XIcon onClick={onClickClose} />
        </S.TopHeader>
        <S.BottomContainer>
          <S.MemberContainer>
            <S.MemberSubContainer>
              {memberList.map((member: any) => (
                <S.MemberBox key={member.userId}>
                  <S.ImgContainer>
                    <Profile profileType={basicProfile} source={member.img} />
                  </S.ImgContainer>
                  <S.NameContainer> {member.name}</S.NameContainer>
                  {member.position === "L" ? (
                    <S.Tag>PM</S.Tag>
                  ) : (
                    <S.TagX
                      onClick={() => onClickDeleteMember(member.memberId)}
                    >
                      <XIcon />
                    </S.TagX>
                  )}
                </S.MemberBox>
              ))}
            </S.MemberSubContainer>
          </S.MemberContainer>
        </S.BottomContainer>
      </S.MainContainer>
    </>
  );
}

import { SetStateAction, useEffect, Dispatch } from "react";
import * as S from "./MemberInvite.styled";
import * as api from "@/api";
import { useRouter } from "next/router";
import Profile from "../Profile";
import { basicProfile } from "@/constants/profile";
import XIcon from "@/public/images/XIcon.svg";
import { useState } from "react";
import { Alert } from "@/util/Alert";
import { MemberType } from "@/types";

export default function MemberInvite({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [memberList, setMemberList] = useState<MemberType[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const projectId = router.query.id;

  useEffect(() => {
    if (projectId) {
      api.getProjectMembers(projectId as string).then(response => {
        setMemberList(response.result);
        setIsLoad(false);
      });
    }
  }, [isLoad, projectId]);

  const onClickClose = () => {
    setIsOpen(false);
  };

  const onClickLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_RELEASER_LINK}/InviteMember/${memberList[0].link}`,
      );
      Alert.success("멤버 초대 링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const onClickDeleteMember = ({
    memberName,
    memberId,
  }: {
    memberName: string;
    memberId: number;
  }) => {
    Alert.question(`멤버 ${memberName}를 정말로 삭제하시겠습니까?`)
      .then(response => {
        if (response.isConfirmed) {
          api.deleteProjectMember(memberId).then(response => {
            setMemberList(
              memberList.filter(
                (member: MemberType) => member.memberId !== memberId,
              ),
            );
          });
        }
      })
      .catch(error => {
        Alert.error("멤버 삭제에 실패하였습니다.");
      });
  };

  if (isLoad) {
    return null;
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
          <S.LinkIconCom onClick={onClickLink} />
        </S.TopHeader>
        <S.BottomContainer>
          <S.MemberContainer>
            <S.MemberSubContainer>
              {memberList.map((member: MemberType) => (
                <S.MemberBox key={member.userId}>
                  <S.ImgContainer>
                    <Profile profileType={basicProfile} source={member.img} />
                  </S.ImgContainer>
                  <S.NameContainer> {member.name}</S.NameContainer>
                  {member.position === "L" ? (
                    <S.Tag>PM</S.Tag>
                  ) : (
                    <S.TagX
                      onClick={() =>
                        onClickDeleteMember({
                          memberName: member.name,
                          memberId: member.memberId,
                        })
                      }
                    >
                      <XIcon />
                    </S.TagX>
                  )}
                </S.MemberBox>
              ))}
            </S.MemberSubContainer>
          </S.MemberContainer>
        </S.BottomContainer>
        <S.CloseContainer>
          <S.CloseButton onClick={onClickClose}>닫기</S.CloseButton>
        </S.CloseContainer>
      </S.MainContainer>
    </>
  );
}

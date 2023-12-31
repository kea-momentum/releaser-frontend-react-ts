import { SetStateAction, useEffect, Dispatch } from "react";
import * as S from "./MemberInvite.styled";
import * as api from "@/api";
import { useRouter } from "next/router";
import Profile from "../Profile";
import { BASIC_PROFILE } from "@/constants";
import XIcon from "@/public/images/XIcon.svg";
import { useState } from "react";
import { Alert } from "@/util";
import { MemberType } from "@/types";
import { MODAL_STYLE, USER_TYPE, MEMBER_INVITE_MESSAGE } from "@/constants";

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
  const [link, setLink] = useState("");
  const projectId = router.query.id;

  useEffect(() => {
    if (projectId) {
      api.getProjectMembers(projectId as string).then(response => {
        setMemberList(response.result.memberList);
        setLink(response.result.link);
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
        `${process.env.NEXT_PUBLIC_RELEASER_LINK}/InviteMember/${link}`,
      );
      Alert.success(MEMBER_INVITE_MESSAGE.MEMBER_INVITE_LINK_COPY_SUCCESS);
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
            const updatedMemberList = memberList.filter(
              (member: MemberType) => member.memberId !== memberId,
            );
            setMemberList([...updatedMemberList]);
          });
        }
      })
      .catch(error => {
        Alert.error(MEMBER_INVITE_MESSAGE.MEMBER_DELETE_FAIL);
      });
  };

  if (isLoad) {
    return null;
  }
  return (
    <>
      <S.MainContainer isOpen={isOpen} style={MODAL_STYLE}>
        <S.TopHeader>
          <S.HeaderText>그룹 멤버 </S.HeaderText>
          <S.LinkIconCom onClick={onClickLink} />
        </S.TopHeader>
        <S.BottomContainer>
          <S.MemberContainer>
            <S.MemberSubContainer>
              {memberList.map((member: MemberType) => (
                <S.MemberBox key={member.userId}>
                  <S.LeftContainer>
                    <S.ImgContainer>
                      <Profile
                        profileType={BASIC_PROFILE}
                        source={member.img}
                      />
                    </S.ImgContainer>
                    <S.NameContainer> {member.name}</S.NameContainer>
                  </S.LeftContainer>
                  {member.position === USER_TYPE.PM ? (
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

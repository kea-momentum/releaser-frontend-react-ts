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
import LinkIcon from "@/public/images/Link.svg";
import { useState } from "react";
import { Alert } from "@/util/Alert";
import { idText } from "typescript";
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

  const onClickLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(memberList[0].link);
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
    Alert.question(`멤버 ${memberName}를 정말로 삭제하시겠습니까?`).then(
      response => {
        if (response.isConfirmed) {
          api.deleteProjectMember(memberId).then(response => {
            console.log(response);
            setMemberList(
              memberList.filter((member: any) => member.memberId !== memberId),
            );
          });
        }
      },
    );
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
          <LinkIcon onClick={onClickLink} />
          <S.XIconCom onClick={onClickClose} />
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
      </S.MainContainer>
    </>
  );
}

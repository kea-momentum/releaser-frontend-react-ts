import * as S from "./ProfileModal.styled";
import Profile from "../Profile/Profile";
import ProfileImg from "@/public/images/profile.svg";
import EditIcon from "@/public/images/EditIcon.svg";
import Trashcan from "@/public/images/Trashcan.svg";
export default function ProfileModal() {
  return (
    <S.MainContainer>
      <S.TopContainer>
        <S.TopLeftContainer>
          <ProfileImg />
        </S.TopLeftContainer>
        <S.TopRightContainer>
          <S.TopButtonContainer>
            <EditIcon />
          </S.TopButtonContainer>
          <S.TopButtonContainer>
            <Trashcan />
          </S.TopButtonContainer>
        </S.TopRightContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <S.BottomMenuContainer>
          <S.BottomButton>로그아웃</S.BottomButton>
          <S.BottomButton>탈퇴하기</S.BottomButton>
        </S.BottomMenuContainer>
      </S.BottomContainer>
    </S.MainContainer>
  );
}

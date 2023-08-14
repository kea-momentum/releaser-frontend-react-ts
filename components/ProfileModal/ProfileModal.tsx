import * as S from "./ProfileModal.styled";
import Profile from "../Profile/Profile";
import ProfileImg from "@/public/images/profile.svg";
import EditIcon from "@/public/images/EditIcon.svg";
import Trashcan from "@/public/images/Trashcan.svg";
import ImageCropper from "./ImageCropper";
import { Fragment } from "react";
import { useState } from "react";
import { MODAL_STYLE } from "@/constants";

export default function ProfileModal() {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);

  const onClickProfileEdit = () => {
    setIsOpenProfileEdit(!isOpenProfileEdit);
  };

  return (
    <Fragment>
      <S.MainContainer>
        <S.TopContainer>
          <S.TopLeftContainer>
            <ProfileImg />
          </S.TopLeftContainer>
          <S.TopRightContainer>
            <S.TopButtonContainer onClick={onClickProfileEdit}>
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
      <S.ProfileImgEditMainContainer
        isOpen={isOpenProfileEdit}
        style={MODAL_STYLE}
      >
        <S.ProfileEditMainContainer>
          <ImageCropper />
        </S.ProfileEditMainContainer>
      </S.ProfileImgEditMainContainer>
    </Fragment>
  );
}

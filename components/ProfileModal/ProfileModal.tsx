import * as S from "./ProfileModal.styled";
import Profile from "../Profile/Profile";
import ProfileImg from "@/public/images/profile.svg";
import EditIcon from "@/public/images/EditIcon.svg";
import Trashcan from "@/public/images/Trashcan.svg";
import ImageCropper from "./ImageCropper";
import { Fragment } from "react";
import { useState } from "react";
import { MODAL_STYLE } from "@/constants";
import { Alert } from "@/util";
import { useRouter } from "next/router";
import * as api from "@/api";

export default function ProfileModal() {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const router = useRouter();
  const onClickProfileEdit = () => {
    setIsOpenProfileEdit(!isOpenProfileEdit);
  };

  const onClickLogOut = () => {
    Alert.question("로그아웃 하시겠습니까?").then(response => {
      if (response.isConfirmed) {
        sessionStorage.clear();
        Alert.success("로그아웃 되었습니다.");
        router.push("/");
      }
    });
  };

  const onClickWithdraw = () => {
    Alert.question("탈퇴하시겠습니까?").then(response => {
      if (response.isConfirmed) {
        api.withdrawUser().then(response => {
          console.log(response);
          if (response.isSuccess) {
            sessionStorage.clear();
            Alert.success("탈퇴 되었습니다.");
            router.push("/");
          } else {
            Alert.error(response.message);
          }
        });
      }
    });
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
            <S.BottomButton onClick={onClickLogOut}>로그아웃</S.BottomButton>
            <S.BottomButton onClick={onClickWithdraw}>탈퇴하기</S.BottomButton>
          </S.BottomMenuContainer>
        </S.BottomContainer>
      </S.MainContainer>
      <S.ProfileImgEditMainContainer
        isOpen={isOpenProfileEdit}
        style={MODAL_STYLE}
      >
        <S.ProfileEditMainContainer>
          <ImageCropper setIsOpenProfileEdit={setIsOpenProfileEdit} />
        </S.ProfileEditMainContainer>
      </S.ProfileImgEditMainContainer>
    </Fragment>
  );
}

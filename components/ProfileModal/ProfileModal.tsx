import * as S from "./ProfileModal.styled";
import EditIcon from "@/public/images/EditIcon.svg";
import Trashcan from "@/public/images/Trashcan.svg";
import ImageCropper from "./ImageCropper";
import { Fragment } from "react";
import { useState } from "react";
import { MODAL_STYLE } from "@/constants";
import { Alert } from "@/util";
import { useRouter } from "next/router";
import * as api from "@/api";
import Profile from "../Profile/Profile";
import { userProfile } from "@/storage/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EDIT_MODAL_PROFILE } from "@/constants";
import { response } from "msw";

export default function ProfileModal() {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const router = useRouter();
  const onClickProfileEdit = () => {
    setIsOpenProfileEdit(!isOpenProfileEdit);
  };
  const currentUserProfile = useRecoilValue(userProfile);
  const handleUserProfile = useSetRecoilState(userProfile);

  const deleteProfile = () => {
    Alert.question("프로필 이미지를 초기화 하시겠습니까?").then(response => {
      if (response.isConfirmed) {
        api.deleteUserProfileImage().then(response => {
          handleUserProfile(response.result);
        });
        Alert.success("프로필 이미지가 초기화되었습니다");
      }
    });
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
            <Profile
              source={
                currentUserProfile.image ??
                "https://releaserbucket.s3.ap-northeast-2.amazonaws.com/default/momentum.png"
              }
              profileType={EDIT_MODAL_PROFILE}
            />
            <S.NameContainer>{currentUserProfile.name}</S.NameContainer>
          </S.TopLeftContainer>
          <S.TopRightContainer>
            <S.TopButtonContainer onClick={onClickProfileEdit}>
              <EditIcon />
            </S.TopButtonContainer>
            <S.TopButtonContainer onClick={deleteProfile}>
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

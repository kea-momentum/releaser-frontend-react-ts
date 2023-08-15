import * as S from "./ProjectNavButtons.styled";
import { useEffect, useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { useRouter } from "next/router";
import * as api from "@/api";
import Profile from "@/components/Profile";
import { PROFILE_TYPE, DEFAULT_PROFILE } from "@/constants";
import { userProfile } from "@/storage/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ProjectNavButtons() {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const router = useRouter();
  const onClickProfile = () => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };
  const [isLoad, setIsLoad] = useState(true);
  const handleUserProfile = useSetRecoilState(userProfile);
  const currentUserProfile = useRecoilValue(userProfile);

  useEffect(() => {
    api.getUserProfile().then(response => {
      console.log(response);
      handleUserProfile(response.result);
      setIsLoad(false);
    });
  }, []);

  if (isLoad) {
    return;
  }
  return (
    <S.LinkButtonContainer>
      <S.ProfileImgContainer onClick={onClickProfile}>
        <Profile
          source={currentUserProfile.image}
          profileType={DEFAULT_PROFILE}
        />
      </S.ProfileImgContainer>
      {isOpenProfileModal && (
        <S.ProfileModalContainer>
          <ProfileModal />
        </S.ProfileModalContainer>
      )}
    </S.LinkButtonContainer>
  );
}

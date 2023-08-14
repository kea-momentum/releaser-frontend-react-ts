import * as S from "./ProjectNavButtons.styled";
import ProfileImg from "@/public/images/profile.svg";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";

export default function ProjectNavButtons() {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const onClickProfile = () => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };

  return (
    <S.LinkButtonContainer>
      <S.ProfileImgContainer>
        <ProfileImg onClick={onClickProfile} />
      </S.ProfileImgContainer>
      {isOpenProfileModal && (
        <S.ProfileModalContainer>
          <ProfileModal />
        </S.ProfileModalContainer>
      )}
    </S.LinkButtonContainer>
  );
}

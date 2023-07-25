import { Fragment } from "react";
import * as S from "./Profile.styled";
import { ProfileSetting } from "@/types/Profile";
import { StaticImageData } from "next/image";

export default function Profile({
  profileType,
  profileName,
  source,
}: {
  profileType: ProfileSetting;
  profileName?: string;
  source: string;
}) {
  return (
    <S.ProfileContainer>
      <S.ImgWrapper {...profileType}>
        <img src={source} alt="Profile Image" />
      </S.ImgWrapper>
      {profileName && (
        <S.Description className="description">{profileName}</S.Description>
      )}
    </S.ProfileContainer>
  );
}

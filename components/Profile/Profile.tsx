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
  profileName: string;
  source: StaticImageData;
}) {
  return (
    <S.ProfileContainer>
      <S.CircleProfile src={source} alt="Profile Image" {...profileType} />
      <S.Description className="description">{profileName}</S.Description>
    </S.ProfileContainer>
  );
}

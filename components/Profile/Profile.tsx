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
        {source ? (
          <img src={source} alt="Profile Image" />
        ) : (
          <img
            src={
              "https://releaserbucket.s3.ap-northeast-2.amazonaws.com/projects/2da5cd15-ac1e-49b1-960d-aa957add2af3-1689244231537.jpeg"
            }
            alt="Profile Image"
          />
        )}
      </S.ImgWrapper>
      {profileName && (
        <S.Description className="description">{profileName}</S.Description>
      )}
    </S.ProfileContainer>
  );
}

import * as S from "./ProjectNavButtons.styled";
import ProfileImg from "@/public/images/profile.svg";

export default function ProjectNavButtons() {
  return (
    <S.LinkButtonContainer>
      <S.ProfileImgContainer>
        <ProfileImg />
      </S.ProfileImgContainer>
    </S.LinkButtonContainer>
  );
}

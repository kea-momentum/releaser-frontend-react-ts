import * as S from "../../styles/pageStyledFile/SignUp.styled";
import BlueSquare from "../../public/images/BlueSquare.svg";
import LionTriangle from "../../public/images/LionTriangle.svg";
import BikeGirl from "../../public/images/BikeGirl.svg";
import RedRectangle from "../../public/images/RedRectangle.svg";
import SignUpForm from "@/components/SignUpForm";
import Logo from "../../public/images/Logo.svg";

export default function SignUp() {
  return (
    <>
      <S.MainContainer>
        <S.TopContainer>
          <BlueSquare />
          <S.RedRectangleContainer>
            <RedRectangle />
          </S.RedRectangleContainer>
        </S.TopContainer>
        <S.FormOuterContainer>
          <S.FormContainer>
            <S.LogoHeader>
              <S.ServiceName>Releaser</S.ServiceName>
              <Logo />
            </S.LogoHeader>
            <SignUpForm />
          </S.FormContainer>
        </S.FormOuterContainer>
        <S.BottomContainer>
          <LionTriangle />
          <BikeGirl />
        </S.BottomContainer>
      </S.MainContainer>
    </>
  );
}

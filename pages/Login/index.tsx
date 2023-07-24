import * as S from "./Login.styled";
import BlueSquare from "../../public/images/BlueSquare.svg";
import LionTriangle from "../../public/images/LionTriangle.svg";
import BikeGirl from "../../public/images/BikeGirl.svg";
import RedRectangle from "../../public/images/RedRectangle.svg";
import LoginForm from "@/components/LoginForm";
import Logo from "../../public/images/Logo.svg";

export default function Login() {
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
            <LoginForm />
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

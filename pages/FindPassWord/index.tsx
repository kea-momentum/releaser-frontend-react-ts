import * as S from "./FindPassWord.styled";
import BlueSquare from "../../public/images/BlueSquare.svg";
import LionTriangle from "../../public/images/LionTriangle.svg";
import BikeGirl from "../../public/images/BikeGirl.svg";
import RedRectangle from "../../public/images/RedRectangle.svg";
import LoginForm from "@/components/LoginForm";
import Logo from "../../public/images/Logo.svg";
import FindPassWordForm from "@/components/FindPassWordForm";

export default function FindPassWord() {
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
            <FindPassWordForm />
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

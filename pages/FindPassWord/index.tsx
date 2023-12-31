import * as Common from "../../styles/pageStyledFile/SignUp.styled";
import BlueSquare from "../../public/images/BlueSquare.svg";
import LionTriangle from "../../public/images/LionTriangle.svg";
import BikeGirl from "../../public/images/BikeGirl.svg";
import RedRectangle from "../../public/images/RedRectangle.svg";
import Logo from "../../public/images/Logo.svg";
import FindPassWordForm from "@/components/FindPassWordForm";

export default function EmailConfirm() {
  return (
    <Common.MainContainer>
      <Common.TopContainer>
        <BlueSquare />
        <Common.RedRectangleContainer>
          <RedRectangle />
        </Common.RedRectangleContainer>
      </Common.TopContainer>
      <Common.FormOuterContainer>
        <Common.FormContainer>
          <Common.LogoHeader>
            <Common.ServiceName>Releaser</Common.ServiceName>
            <Logo />
          </Common.LogoHeader>
          <FindPassWordForm />
        </Common.FormContainer>
      </Common.FormOuterContainer>
      <Common.BottomContainer>
        <LionTriangle />
        <BikeGirl />
      </Common.BottomContainer>
    </Common.MainContainer>
  );
}

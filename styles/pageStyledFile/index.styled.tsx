import styled, { keyframes } from "styled-components";
import LandingImg from "@/public/images/LadingImg.svg";
import LandingGraph from "@/public/images/LadingGraph.svg";

const fadeInAnimation = keyframes`
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
`;

const fadeInHeader = keyframes`
 0% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(400px);
            transform: translateZ(400px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
`;

export const NavBarContainer = styled.div`
  position: fixed;
  z-index: 3px;
`;

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
`;

export const Section = styled.section`
  width: 100%;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const LeftBox = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightBox = styled.div`
  width: 50%;
`;

export const LandingImgContainer = styled(LandingImg)`
  width: 70%;
  min-width: 500px;
  min-height: 500px;

  margin-top: 6vh;
`;

export const LandingGraphStyled = styled(LandingGraph)`
  width: 80%;

  min-width: 500px;
  min-height: 300px;

  margin-left: 10vw;
  margin-top: 10vh;
`;

export const Header = styled.div`
  font-size: 80px;
  font-weight: 700;
  margin-top: -3vh;
  color: #434343;

  animation: ${fadeInHeader} 2s ease-in-out;

  @media screen and (min-width: 800px) {
    font-size: 100px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 110px;
  }

  @media screen and (min-width: 1300px) {
    font-size: 115px;
  }

  @media screen and (min-width: 1400px) {
    font-size: 120px;
  }

  @media screen and (min-width: 1500px) {
    font-size: 120px;
  }
`;

export const LoginButton = styled.div`
  font-size: 22px;

  display: flex;
  align-items: start;

  margin-top: 100px;
  margin-bottom: 100px;

  padding: 20px;
  margin-right: -3vw;

  @media screen and (min-width: 800px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 19px;
  }

  @media screen and (min-width: 1300px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1400px) {
    font-size: 21px;
  }

  @media screen and (min-width: 1500px) {
    font-size: 22px;
  }
`;

export const SubHeader = styled.div`
  width: 400px;
  height: 3vh;

  display: flex;
  justify-content: end;
  align-items: center;

  cursor: pointer;
`;

export const RightTopBox = styled.div`
  width: 100%;

  margin-top: 10vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const RightBottomBox = styled.div`
  width: 100%;
`;

export const FeatureBox = styled.div`
  width: 80%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: start;

  margin-bottom: 20px;
  border-radius: 10px;
  margin-left: 100%;

  background: #f2f2f2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  animation: ${fadeInAnimation} 2s ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

export const FeatureText = styled.div`
  font-size: 12px;
  font-weight: 500;

  margin-left: 30px;

  @media screen and (min-width: 800px) {
    font-size: 14px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 17px;
  }

  @media screen and (min-width: 1500px) {
    font-size: 19px;
  }
`;

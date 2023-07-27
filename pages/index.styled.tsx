import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 94vh;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 100%;

  display: flex;

  overflow: hidden;
`;

export const Section = styled.section`
  width: 100%;
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
  height: 100%;
`;

export const LandingImgContainer = styled.div`
  margin-top: 1vh;
`;

export const Header = styled.div`
  font-size: 110px;
  font-weight: 700;
  margin-top: -3vh;

  color: #434343;
`;

export const LoginButton = styled.div`
  font-size: 22px;
  margin-right: 5px;
  margin-top: -2px;
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
  height: 45%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const RightBottomBox = styled.div`
  width: 100%;
  height: 65%;

  display: flex;
  justify-content: end;
`;

export const LandingGraphContainer = styled.div``;

export const FeatureBox = styled.div`
  width: 80%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: start;

  margin-bottom: 20px;

  background: #f2f2f2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const FeatureText = styled.div`
  font-size: 18px;
  font-weight: 500;

  margin-left: 30px;
`;

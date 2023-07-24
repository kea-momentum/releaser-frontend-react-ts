import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;


  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 50vh;

  display: flex;
  justify-content: space-between;

  z-index: 1;
  position: relative;
`;

export const RedRectangleContainer = styled.div`
  margin-top: 20px;
`;

export const BottomContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  z-index: 1;
  position: absolute;
  bottom: 0;
`;

export const FormOuterContainer = styled.div`
  width: 100%;
  height: 35%;

  margin-top: -20vh;
  z-index: 5;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 460px;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoHeader = styled.div`
  font-weight: 1000;

  width: 100%;
  height: 73px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const ServiceName = styled.header`
  color: #434343;
  font-size: 55px;
  font-weight: 700;

  margin-top: 20px;
  margin-right: 10px;
`;

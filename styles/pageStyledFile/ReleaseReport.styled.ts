import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f3f3f3;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hide;
`;

export const Section = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 5vh;
`;

export const ReportBox = styled.div`
  width: 879px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 30px 30px 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset;

  margin-bottom: 5vh;
`;

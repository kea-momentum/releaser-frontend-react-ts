import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hide;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  width: 800px;
  height: 700px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 17px;
  background: #f8f8f8;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

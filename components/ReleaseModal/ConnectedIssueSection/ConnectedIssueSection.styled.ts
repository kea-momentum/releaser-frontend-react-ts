import styled from "styled-components";

export const RightContainer = styled.div`
  width: 95%;
  height: 500px;

  margin-top: 7px;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 39px;

  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ConnectedIssuesOuterSection = styled.div`
  width: 100%;
  height: 525px;

  display: flex;
  justify-content: center;

  border-radius: 6px;
  background: rgba(129, 160, 211, 0.3);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  margin-top: 5px;
`;

export const ConnectedIssueInnerSection = styled.section`
  width: 720px;
  height: 510px;

  margin-top: 5px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(200, 199, 199, 0.3);
    height: 20px;
    border-radius: 400px;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export const ConnectedIssuesContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  margin-bottom: 10px;
`;

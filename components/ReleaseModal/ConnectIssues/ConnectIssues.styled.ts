import styled from "styled-components";

type EnablState = {
  enable: boolean;
};

export const IssuesSection = styled.section`
  width: 720px;
  height: 180px;

  display: flex;
  justify-content: center;

  border-radius: 10px;
  background: rgba(200, 199, 199, 0.3);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const IssueInnerSection = styled.section`
  width: 720px;
  height: 170px;

  margin-top: 5px;
  margin-bottom: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const IssuesContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 5px;
  border-radius: 10px;
`;

export const IssueBox = styled.section`
  width: 690px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  border-radius: 5px;
  margin-top: 10px;
  background-color: white;

  &:hover {
    background: rgba(129, 160, 211, 0.3);
  }
`;

export const ConnectStatus = styled.div<EnablState>`
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background-color: ${({ enable }) => (enable ? "#81A0D3" : "#e2e2e2")};
  margin-left: 6px;
  margin-right: 3px;
`;

export const IssueTitle = styled.div`
  width: 630px;
  height: 22px;

  display: flex;
  align-items: center;

  margin-left: 8px;
`;

export const TagBox = styled.div`
  width: 80px;
  height: 70%;
  margin-right: 5px;
`;

import styled from "styled-components";
import Modal from "react-modal";

export const Wrapper = styled.div`
  width: 100vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContainer = styled.div`
    height: 100%;
    padding: 3% 4%;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 2%;
`;

export const PageTitle = styled.div`
    margin-right: 2%;

    color: #000;
    font-family: Pretendard;
    font-size: 48px;
    font-style: normal;
    font-weight: 750;
    line-height: normal;
    letter-spacing: -1px;
`;

export const SectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SectionContent = styled.div`
    width: 34%;
`;

export const SectionTitle = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.8px;

    margin-right: 10px;
    margin-left: 10px;
`;

export const IssueContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const IssueModal = styled(Modal)`
    width: 780px;
    height: 674px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
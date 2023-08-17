import styled from "styled-components";
import Modal from "react-modal";

export const MainContainer = styled.div`
  width: 100%;
  height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 94%;

  display: flex;
  justify-content: center;
`;

export const LeftContent = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  border-right: 2px solid #d4d2d2;
`;

export const RightContent = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.div`
  height: 12%;
`;

export const ProjectListSection = styled.div`
  height: 88%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 4% 0 0 6%;
`;

export const ContentTitle = styled.div`
  margin-right: 48%;

  color: #888;
  font-size: 26px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ProjectModal = styled(Modal)`
  width: 40vw;
  height: 46vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ProjectListContainer = styled.div`
  width: 95%;
  height: 100%;

  display: flex;
  justify-content: center;

  border-radius: 18px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const ProjectListInnerContainer = styled.div`
  width: 95%;
  height: 99.2%;

  margin-top: 0.8%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const ProjectListWrapper = styled.div`
  width: 95%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  margin-top: 26px;
`;

export const EmptpyContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-top: 20%;
`;

export const EmptyComment = styled.div`
  color: #414040;
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.52px;
`;

export const ProjectFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import styled from "styled-components";
import Modal from "react-modal";

type ComponentType = {
  issue?: number;
  deploy?: number;
  edit?: number;
};

export const IssuePreviewBox = styled.div<ComponentType>`
  width: ${({ issue }) => (issue ? "386px" : "303px")};
  height: ${({ issue }) => (issue ? "94px" : "70px")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 11px;
  background: ${({ deploy }) => (deploy ? "rgba(255, 255, 255, 0.60)" : "#fff")};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  margin-top: ${({ issue }) => (issue ? "0" : "13px")};

  cursor: default;
`;

export const TopContainer = styled.div`
  width: 90%;
  height: 30%;

  display: flex;
  align-items: center;

  font-family: Pretendard;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.28px;

  margin-top: 7px;
`;

export const IssueNumber = styled.div`
  display: flex;
  align-items: center;

  color: #6D6D6D;
  font-size: 14px;
  font-weight: 400;

  margin-right: 6px;
`;

export const Title = styled.div<ComponentType>`
  width: ${({issue}) => (issue ? "780px" : "78%")};

  height: 100%;

  display: flex;
  align-items: center;

  color: #393939;
  font-size: 16px;
  font-weight: 500;

  margin-left: 1px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightTop = styled.div`
  width: 18%;

  display: flex;
  flex-direction: row;
`;

export const ResolvedToggle = styled.div<ComponentType>`
  display: flex;

  width: 15px;
  height: 15px;
  border-radius: 12px;

  margin-left: 10px;
  margin-right: ${({issue}) => (issue ? "0px" : "8px")};
  
  background: ${({ edit }) => (edit ? "#bf3b3b" : "#D9D9D9")};
`;

export const MiddleContainer = styled.div`
  width: 90%;

  display: flex;
  justify-content: flex-start;

  margin-bottom: 8px;

  color: #9d9d9d;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.22px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BottomContainer = styled.div<ComponentType>`
  width: 90%;
  height: ${({ issue }) => (issue ? "25%" : "30%")};

  display: flex;
  align-items: end;
  justify-content: space-between;

  margin-bottom: 8px;
`;

export const ProfileContainer = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 18px;
  background: #ffce70;
`;

export const ButtonContainer = styled.div`
  width: 60px;
  height: 100%;

  display: flex;
  justify-content: end;
`;

export const Button = styled.div`
  font-size: 12px;

  width: 30px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: end;

  cursor: pointer;
`;

export const TagBox = styled.div`
  font-size: 10px;

  width: 80px;
  height: 100%;
`;

export const DateBox = styled.div`
  font-size: 7px;
  font-weight: 700;

  width: 60px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10%;
  background: #e9e9e9;
  margin-left: 9px;
`;

export const BottomLeftContainer = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
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
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    outline: none !important;
`;
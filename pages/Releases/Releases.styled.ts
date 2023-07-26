import styled from "styled-components";
import Modal from "react-modal";
import CircleNode from "@/public/images/CircleNodeFirst.svg";

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
  height: 150%;
`;

export const ReleaseModal = styled(Modal)`
  width: 1123px;
  height: 684px;

  position: absolute;
  padding-bottom: 10px;
  padding-top: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  outline: none !important;
`;

export const MajorNode = styled(CircleNode)`
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 300px;

  position: absolute;
  z-index: 0;
`;

export const WelcomTitle = styled.div`
  width: 500px;
  font-size: 40px;
  font-weight: 550;

  color: #707070;
  text-align: center;
  font-family: Pretendard;

  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 300px;

  position: absolute;
  z-index: 0;
`;

export const ProjectInfo = styled.div`
  height: 80px;

  display: flex;
  align-items: center;

  position: absolute;
  left: 1vw;
  top: 8vh;

  padding: 10px;
  border-radius: 9px;
  background: #f1f1f1;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  border-radius: 20px;
  color: #727272;
`;

export const ImgWrapper = styled.div`
  width: 60px;
  height: 60px;

  border-radius: 50%;
  margin-left: 20px;
  border: 2px solid #727272;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProjectTitle = styled.div`
  font-size: 20px;
  font-weight: 700;

  width: fit-content;
  height: 30%;
  padding-left: 20px;
  padding-right: 20px;

  border-right: 2px solid #727272;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GroupName = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: fit-content;
  height: 30%;

  padding-left: 20px;
  padding-right: 25px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

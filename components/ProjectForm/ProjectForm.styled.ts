import styled from "styled-components";
import Modal from "react-modal";

export const Wrapper = styled.div`
  width: 44vw;
  height: 14vh;

  display: flex;

  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  margin-top: 3px;
  margin-left: 38px;

  align-items: center;

  &:last-child {
    margin-bottom: 30px;
  }

  &:hover {
    background: #f9f1ad;
    color: white;
  }
  cursor: pointer;
`;

export const ImgSection = styled.div`
  width: 16%;
  padding-left: 30px;
`;

export const ImgWrapper = styled.div`
  width: 88px;
  height: 88px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border-radius: 50%;
  border: 0.6px solid #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoContent = styled.div`
  width: 65%;

  padding-left: 10px;

  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  width: fit-content;

  margin-bottom: 10px;

  color: #727272;
  font-size: 26px;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;
`;

export const VerticalLine = styled.div`
  width: 2px;
  height: 100%;
  background-color: #d9d5d5;
`;

export const IconWrapper = styled.div`
  width: 13%;

  display: flex;
  flex-direction: row;
`;

export const HorizontalLine = styled.div`
  height: 2px;
  width: 365%;
  margin-left: -130%;

  background-color: #d9d5d5;
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

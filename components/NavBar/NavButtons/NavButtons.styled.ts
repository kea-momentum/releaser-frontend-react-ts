import styled from "styled-components";
import Modal from "react-modal";

export const LinkButtonContainer = styled.div`
  width: fit-content;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 15px;
`;

export const GroupButton = styled.div`
  font-size: 14px;
  font-weight: 500;

  width: 60px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #595959;
  color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;
  margin-left: 10px;

  cursor: pointer;
`;

export const CircleButton = styled.div`
  width: 30px;
  height: 30px;

  background: grey;
`;

export const ReleaseButton = styled.div`
  font-size: 15px;
  font-weight: 500;

  width: 70px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  color: black;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;

  cursor: pointer;
`;

export const IssueButton = styled.div`
  font-size: 15px;
  font-weight: 500;

  width: 85px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  color: black;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;

  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 35px;
  height: 35px;

  border-radius: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin-right: 10px;
  box-shadow: 0px 2px 2px 0px rgba(0.2, 0.2, 0.2, 0.25) inset;

  cursor: pointer;
`;

export const NotificationModal = styled(Modal)`
  width: 478px;
  height: 488px;

  position: absolute;
  top: 7%;
  left: 67%;

  border-radius: 20px;
  border: 0.5px solid #666;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

export const ListContainer = styled.div`
  width: 99%;
  height: 50px;

  display: flex;
  align-items: center;

  background: white;

  margin-bottom: 10px;
  border: 1px solid black;
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

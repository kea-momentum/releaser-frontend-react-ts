import styled from "styled-components";
import Modal from "react-modal";

export const MainContainer = styled(Modal)`
  width: 400px;
  height: 400px;

  position: absolute;
  padding-bottom: 30px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  outline: none !important;
`;

export const TopHeader = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid black;
`;

export const HeaderText = styled.div`
  font-weight: 600;
  width: 90%;
  height: 80%;

  display: flex;
  align-items: center;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 350px;

  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const MemberContainer = styled.div`
  width: 95%;
  height: 360px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const MemberSubContainer = styled.div`
  width: 99%;

  margin: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const MemberBox = styled.div`
  width: 100%;
  height: 50px;

  border-radius: 10px;
  background: #f0f0f0;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;

  margin-bottom: 10px;
`;

export const ImgContainer = styled.div`
  margin-left: 10px;
`;

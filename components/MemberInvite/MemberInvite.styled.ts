import styled from "styled-components";
import Modal from "react-modal";
import XIcon from "@/public/images/XIcon.svg";
import LinkIcon from "@/public/images/Link.svg";

export const MainContainer = styled(Modal)`
  width: 400px;
  height: 380px;

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
  z-index: -1;
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
  width: 85%;
  height: 80%;

  display: flex;
  align-items: center;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 310px;

  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const MemberContainer = styled.div`
  width: 95%;
  height: 300px;

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

export const NameContainer = styled.div`
  margin-left: 10px;
`;

export const Tag = styled.div`
  margin-left: 200px;
  width: 53px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background: #ed726f;
  color: #ffffff;
`;

export const TagX = styled.div`
  margin-left: 200px;
  width: 53px;
  height: 25px;

  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
`;

export const LinkIconCom = styled(LinkIcon)`
  margin-left: 10px;
  cursor: pointer;
`;

export const CloseContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.div`
  width: 75px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background: #595959;
  color: white;

  cursor: pointer;
`;

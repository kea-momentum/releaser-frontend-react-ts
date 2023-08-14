import styled from "styled-components";
import Modal from "react-modal";

export const MainContainer = styled.div`
  width: 200px;
  height: 200px;

  background: red;
  border-radius: 20px 0px 20px 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #eeeeee;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 70%;

  display: flex;

  border-radius: 20px 0px 0px 0px;
  border-bottom: 3px solid #d9d5d5;
`;

export const TopLeftContainer = styled.div`
  width: 60%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopRightContainer = styled.div`
  width: 40%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  justify-content: center;

  border-radius: 0px 0px 20px 20px;
`;

export const TopButtonContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-left: 3px solid #d9d5d5;
  &:hover {
    background: #d9d9d9;
  }
  cursor: pointer;
`;

export const BottomMenuContainer = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  justify-content: space-between;
`;

export const BottomButton = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
`;

export const ProfileImgEditMainContainer = styled(Modal)`
  width: 500px;
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
  z-index: -1;
`;

export const ProfileEditMainContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: blue;
`;

export const ImageContainer = styled.div`
  width: 300px;
  height: 300px;

  background: red;
`;

export const CropImageButton = styled.div`
  width: 100px;
  height: 20px;

  background: red;
`;

export const ProfileEditButtonContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  background: yellow;
`;

export const FileUploadButton = styled.div`
  width: 50px;
  height: 30px;

  background: red;
`;

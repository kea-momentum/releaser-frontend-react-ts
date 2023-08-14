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

export const ImageEditTopContainer = styled.div`
  width: 100%;
  height: 270px;

  display: flex;
  justify-content: center;
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

  cursor: pointer;
`;

export const ProfileImgEditMainContainer = styled(Modal)`
  width: 400px;

  position: absolute;
  padding-bottom: 30px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffce70;
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
`;

export const ImageContainer = styled.div`
  width: 250px;
  height: 250px;
`;

export const CropImageButton = styled.div`
  width: 40px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  background: #5c5c5c;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

export const ProfileEditButtonContainer = styled.div`
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: end;

  margin-top: 20px;
`;

export const FileUploadButton = styled.div`
  width: 50px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  background: #5c5c5c;
  margin-right: 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

export const ProfileEditTopMenu = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: end;
`;

export const ProfileCircleContainer = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%; /* 원형으로 만들기 위해 border-radius 추가 */

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; /* 이미지도 원형으로 맞추기 위해 border-radius 추가 */
  }
  border: 2px solid #352d2d;
`;

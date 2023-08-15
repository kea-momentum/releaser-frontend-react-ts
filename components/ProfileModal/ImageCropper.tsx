import React, { useState, createRef, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as S from "./ProfileModal.styled";
import ImageIcon from "@/public/images/Image.svg";
import CropIcon from "@/public/images/Crop.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EditIcon, Pointer } from "lucide-react";
import { userProfile } from "@/storage/atom";
import * as api from "@/api";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ImageCropper = ({
  setIsOpenProfileEdit,
}: {
  setIsOpenProfileEdit: any;
}) => {
  const currentUserProfile = useRecoilValue(userProfile);
  const handleUserProfile = useSetRecoilState(userProfile);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(currentUserProfile.image);

  const [isCropped, setIsCropped] = useState(false);
  const cropperRef = createRef<ReactCropperElement>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onClickSaveImage = () => {};

  const onClickFile = () => {
    hiddenFileInput.current?.click();
  };

  const onClickXIcon = () => {
    setIsOpenProfileEdit(false);
  };

  const onClickEdit = () => {
    setIsCropped(true);
  };

  const onChange = (e: any) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      setIsCropped(true);
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setIsCropped(!isCropped);
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      api
        .patchProfileImage({
          image: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
        })
        .then(response => {
          if (response.isSuccess) {
            handleUserProfile(response.result);
          }
        });
    }
  };

  return (
    <>
      <S.ProfileEditTopMenu>
        <S.XIconStyled onClick={onClickXIcon} />
      </S.ProfileEditTopMenu>
      <S.ImageEditTopContainer>
        <S.ImageContainer>
          {isCropped ? (
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              zoomTo={0.2}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          ) : (
            <S.ProfileCircleContainer>
              <img style={{ height: "100%", width: "100%" }} src={cropData} />

              {cropData !== currentUserProfile.image && (
                <S.ImageEditButton onClick={onClickEdit}>
                  <EditIcon style={{ stroke: "#dcdcdc" }} />
                </S.ImageEditButton>
              )}
            </S.ProfileCircleContainer>
          )}
        </S.ImageContainer>
      </S.ImageEditTopContainer>

      <S.ProfileEditButtonContainer>
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={onChange}
        />
        <S.FileUploadButton onClick={onClickFile}>
          <S.ButtonIconContainer>
            <ImageIcon />
          </S.ButtonIconContainer>
          변경
        </S.FileUploadButton>
        <S.CropImageButton style={{ float: "right" }} onClick={getCropData}>
          <S.ButtonIconContainer>
            <CropIcon />{" "}
          </S.ButtonIconContainer>
          저장
        </S.CropImageButton>
      </S.ProfileEditButtonContainer>
    </>
  );
};

export default ImageCropper;

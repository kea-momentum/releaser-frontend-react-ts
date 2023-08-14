import React, { useState, createRef, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as S from "./ProfileModal.styled";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ImageCropper: React.FC = () => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [isCropped, setIsCropped] = useState(true);
  const cropperRef = createRef<ReactCropperElement>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onClickFile = () => {
    hiddenFileInput.current?.click();
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
      setIsCropped(!isCropped);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setIsCropped(!isCropped);
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <>
      <S.ImageContainer>
        {isCropped ? (
          <Cropper
            ref={cropperRef}
            style={{ height: "100%", width: "100%" }}
            zoomTo={0.3}
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
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        )}
      </S.ImageContainer>

      <S.ProfileEditButtonContainer>
        <S.FileUploadButton>
          <input type="file" onChange={onChange} />
        </S.FileUploadButton>
        <S.CropImageButton style={{ float: "right" }} onClick={getCropData}>
          Crop Image
        </S.CropImageButton>
      </S.ProfileEditButtonContainer>
    </>
  );
};

export default ImageCropper;

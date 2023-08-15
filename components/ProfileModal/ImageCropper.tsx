import React, {
  useState,
  createRef,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as S from "./ProfileModal.styled";
import { XIcon } from "lucide-react";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ImageCropper = ({
  setIsOpenProfileEdit,
}: {
  setIsOpenProfileEdit: any;
}) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [isCropped, setIsCropped] = useState(true);
  const cropperRef = createRef<ReactCropperElement>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onClickFile = () => {
    hiddenFileInput.current?.click();
  };

  const onClickXIcon = () => {
    setIsOpenProfileEdit(false);
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
    }
  };

  return (
    <>
      <S.ProfileEditTopMenu>
        <XIcon onClick={onClickXIcon} />
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
        <S.FileUploadButton onClick={onClickFile}>변경</S.FileUploadButton>
        <S.CropImageButton style={{ float: "right" }} onClick={getCropData}>
          저장
        </S.CropImageButton>
      </S.ProfileEditButtonContainer>
    </>
  );
};

export default ImageCropper;

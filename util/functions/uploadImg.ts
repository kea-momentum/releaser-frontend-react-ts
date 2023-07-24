import { ChangeEvent } from "react";
import { Alert } from "@/util/Alert";

export const uploadImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setData: Function,
) => {
  if (event.target.files && event.target.files[0]) {
    const imageFile = event.target.files[0];
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = imageFile.name.split(".").pop()?.toLowerCase();

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageURL = reader.result as string;
        setData((prevData: any) => ({ ...prevData, img: imageURL }));
      };

      reader.readAsDataURL(imageFile);
    } else {
      Alert.warn(
        "지원하지 않는 파일 확장자입니다.",
        "png, jpg, jpeg 확장자로 업로드해주세요.",
      );
    }
  }
};

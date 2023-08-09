import * as S from "./AlertMessage.styled";
import AlertImage from "@/public/images/AlertImage.svg";

type AlertMessageProp = {
  message: string;
};

export default function AlertMessage({ message }: AlertMessageProp) {
  return (
    <S.AlertContainer>
      <S.ImageContainer>
        <AlertImage />
      </S.ImageContainer>
      <S.Alert>{message}</S.Alert>
    </S.AlertContainer>
  );
}

import * as S from "./NewVersion.styled";
import { SetStateAction, Dispatch } from "react";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";
import SelectTriangle from "@/public/images/SelectTriangleVersion.svg";
import SelectCircle from "@/public/images/SelectCircleVersion.svg";
import SelectRectangle from "@/public/images/SelectSquareVersion.svg";
import { RELEASE_VERSION } from "@/constants";
export default function NewVersion({
  version,
  setVersion,
}: {
  version: string;
  setVersion: Dispatch<SetStateAction<string>>;
}) {
  const onTriangleClick = (event: any) => {
    setVersion(RELEASE_VERSION.PATCH);
  };

  const onSquareClick = (event: any) => {
    setVersion(RELEASE_VERSION.MINOR);
  };
  const onCircleClick = (event: any) => {
    setVersion(RELEASE_VERSION.MAJOR);
  };
  return (
    <S.VersionContainer>
      <S.VLogoContainer>
        <S.VLogo>V</S.VLogo>
      </S.VLogoContainer>
      {version === RELEASE_VERSION.MAJOR ? (
        <SelectCircle onClick={onCircleClick} id={RELEASE_VERSION.MAJOR} />
      ) : (
        <Circle onClick={onCircleClick} id={RELEASE_VERSION.MAJOR} />
      )}
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
      {version === RELEASE_VERSION.MINOR ? (
        <SelectRectangle onClick={onSquareClick} id={RELEASE_VERSION.MINOR} />
      ) : (
        <Rectangle onClick={onSquareClick} id={RELEASE_VERSION.MINOR} />
      )}
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
      {version === RELEASE_VERSION.PATCH ? (
        <SelectTriangle onClick={onTriangleClick} id={RELEASE_VERSION.PATCH} />
      ) : (
        <Triangle onClick={onTriangleClick} id={RELEASE_VERSION.PATCH} />
      )}
    </S.VersionContainer>
  );
}

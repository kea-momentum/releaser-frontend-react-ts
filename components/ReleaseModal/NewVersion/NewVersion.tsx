import * as S from "./NewVersion.styled";
import {
  useEffect,
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { handleVersion } from "@/util/functions/version";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";
import SelectTriangle from "@/public/images/SelectTriangleVersion.svg";
import SelectCircle from "@/public/images/SelectCircleVersion.svg";
import SelectRectangle from "@/public/images/SelectSquareVersion.svg";
export default function NewVersion({
  version,
  setVersion,
}: {
  version: string;
  setVersion: Dispatch<SetStateAction<string>>;
}) {
  const onTriangleClick = (event: any) => {
    setVersion("PATCH");
  };

  const onSquareClick = (event: any) => {
    setVersion("MINOR");
  };
  const onCircleClick = (event: any) => {
    setVersion("MAJOR");
  };
  return (
    <S.VersionContainer>
      <S.VLogoContainer>
        <S.VLogo>V</S.VLogo>
      </S.VLogoContainer>
      {version === "MAJOR" ? (
        <SelectCircle onClick={onCircleClick} id="MAJOR" />
      ) : (
        <Circle onClick={onCircleClick} id="MAJOR" />
      )}
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
      {version === "MINOR" ? (
        <SelectRectangle onClick={onSquareClick} id="MINOR" />
      ) : (
        <Rectangle onClick={onSquareClick} id="MINOR" />
      )}
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
      {version === "PATCH" ? (
        <SelectTriangle onClick={onTriangleClick} id="PATCH" />
      ) : (
        <Triangle onClick={onTriangleClick} id="PATCH" />
      )}
    </S.VersionContainer>
  );
}

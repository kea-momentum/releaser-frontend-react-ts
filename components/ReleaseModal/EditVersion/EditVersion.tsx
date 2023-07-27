import * as S from "./EditVersion.styled";
import { useEffect, useState, ChangeEvent } from "react";
import { handleVersion } from "@/util/functions/version";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";
import { checkVersionType } from "@/util/functions/version";
export default function EditVersion({
  originalVersion,
  version,
  setVersion,
}: {
  originalVersion: string;
  version?: string;
  setVersion?: any;
}) {
  const getVersion = () => {
    const type = checkVersionType(originalVersion).type;
    return type === "major" ? (
      <Circle />
    ) : type === "minor" ? (
      <Rectangle />
    ) : (
      <Triangle />
    );
  };
  const onChangeVersion = (e: any) => {
    if (setVersion) {
      setVersion(e.target.value);
    }
  };

  return (
    <S.VersionContainer>
      <S.VLogoContainer>{getVersion()}</S.VLogoContainer>
      <S.VersionInput
        type="text"
        placeholder={originalVersion}
        value={version}
        onChange={onChangeVersion}
      />
    </S.VersionContainer>
  );
}

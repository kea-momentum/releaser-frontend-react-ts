import * as S from "./EditVersion.styled";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";
import { checkVersionType } from "@/util";
import { RELEASE_VERSION } from "@/constants";

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
    return type === RELEASE_VERSION.MAJOR ? (
      <Circle />
    ) : type === RELEASE_VERSION.MINOR ? (
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

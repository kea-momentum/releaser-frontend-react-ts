import * as S from "./UserGuide.styled";
import VersionGuide from "@/public/images/VersionGuide.svg";
import CreateNode from "@/public/images/CreateNode.gif";
import Mail from "../../public/images/Mail.svg";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function UserGuide() {
  const [page, setPage] = useState(0);

  return (
    <S.MainContainer>
      {page === 0 && (
        <Fragment>
          <S.TopContainer>이용가이드 - 버전가이드</S.TopContainer>
          <S.ImageContainer>
            <VersionGuide />
          </S.ImageContainer>
        </Fragment>
      )}

      {page === 1 && (
        <Fragment>
          <S.TopContainer>
            이용가이드 - 릴리즈 노트 생성 <S.XIonStyled />
          </S.TopContainer>
          <S.ImageContainer>
            <Image src={CreateNode} alt="My GIF" width={330} height={150} />
          </S.ImageContainer>
        </Fragment>
      )}
    </S.MainContainer>
  );
}

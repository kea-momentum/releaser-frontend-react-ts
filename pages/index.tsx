import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import * as S from "./index.styled";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <S.MainContainer>
      <NavBar page={"projects"} />
      <S.OuterSection>
        <S.Section>랜딩페이지</S.Section>
      </S.OuterSection>
    </S.MainContainer>
  );
}

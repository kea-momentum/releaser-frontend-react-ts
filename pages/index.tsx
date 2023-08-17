import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import * as S from "./index.styled";
import LandingImg from "@/public/images/LadingImg.svg";
import LadingTriangle from "@/public/images/LadingTriangle.svg";
import LandingGraph from "@/public/images/LadingGraph.svg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <S.NavBarContainer>
        <NavBar page={"landing"} />
      </S.NavBarContainer>

      <S.MainContainer>
        <S.OuterSection>
          <S.LeftBox>
            <S.LandingImgContainer />
            <S.Header>Releaser</S.Header>
            <S.SubHeader
              onClick={() => {
                router.push(`/Login`);
              }}
            >
              <S.LoginButton>Start Releasing Notes &gt;</S.LoginButton>
            </S.SubHeader>
          </S.LeftBox>
          <S.RightBox>
            <S.RightTopBox>
              <S.FeatureBox>
                <S.FeatureText>
                  그래프와 도형으로 확인하는 릴리즈 히스토리
                </S.FeatureText>
              </S.FeatureBox>
              <S.FeatureBox>
                <S.FeatureText>
                  모든 프로젝트 멤버들이 쉽게 추적할 수 있는 배포 현황
                </S.FeatureText>
              </S.FeatureBox>
              <S.FeatureBox>
                <S.FeatureText>
                  릴리즈에 이슈를 연결해서 관리하기{" "}
                </S.FeatureText>
              </S.FeatureBox>
            </S.RightTopBox>
            <S.LandingGraphStyled />
          </S.RightBox>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

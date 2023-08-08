import * as S from "./NavBar.styled";
import LogoMini from "@/public/images/LogoMini.svg";
import ProjectNavButtons from "./ProjectNavButtons";
import NavButtons from "./NavButtons";
import { useRouter } from "next/router";
import LandingNavButtons from "./LandingNavButtons";

export default function NavBar({
  page,
  projectId,
}: {
  page: string;
  projectId?: number;
}) {
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/ProjectWorkspace");
  };

  return (
    <S.NavBarContainer>
      <S.LogoContainer onClick={onClickLogo}>
        <S.LogoText>Releaser </S.LogoText>
        <LogoMini />
      </S.LogoContainer>
      <S.LinkButtonContainer>
        {page === "projects" && <ProjectNavButtons />}
        {page === "releases" && (
          <NavButtons type="releases" projectId={projectId} />
        )}
        {page === "issues" && (
          <NavButtons type="issues" projectId={projectId} />
        )}
        {page === "landing" && <LandingNavButtons />}
      </S.LinkButtonContainer>
    </S.NavBarContainer>
  );
}

import * as S from "./NavBar.styled";
import LogoMini from "@/public/images/LogoMini.svg";
import ProjectNavButtons from "./ProjectNavButtons";
import NavButtons from "./NavButtons";
import { useRouter } from "next/router";
import LandingNavButtons from "./LandingNavButtons";
import { PAGE, CONTENT_TYPE } from "@/constants";

export default function NavBar({
  page,
  projectId,
}: {
  page: string;
  projectId?: number;
}) {
  const router = useRouter();

  const onClickLogo = () => {
    router.push(PAGE.PROJECT_WORKSPACE_PAGE);
  };

  return (
    <S.NavBarContainer>
      <S.LogoContainer onClick={onClickLogo}>
        <S.LogoText>Releaser </S.LogoText>
        <LogoMini />
      </S.LogoContainer>
      <S.LinkButtonContainer>
        {page === CONTENT_TYPE.PROJECT && <ProjectNavButtons />}
        {page === CONTENT_TYPE.RELEASE && (
          <NavButtons type={CONTENT_TYPE.RELEASE} projectId={projectId} />
        )}
        {page === CONTENT_TYPE.ISSUE && (
          <NavButtons type={CONTENT_TYPE.ISSUE} projectId={projectId} />
        )}
        {page === CONTENT_TYPE.LADNING && <LandingNavButtons />}
      </S.LinkButtonContainer>
    </S.NavBarContainer>
  );
}

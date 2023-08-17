import * as S from "../../../styles/pageStyledFile/Search.styled";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { ReleaseReport, ReleaseReportResponse } from "@/types";
import ReportEditForm from "@/components/ReportEditForm";
import SearchSection from "@/components/SearchSection";
import { CONTENT_TYPE } from "@/constants";
import { projectId as recoilProjectId, backLink } from "@/storage/atom";
import { useSetRecoilState } from "recoil";

export default function Search() {
  const router = useRouter();
  const projectIdRouter = router.query.id as string;
  const projectIdHandler = useSetRecoilState<string>(recoilProjectId);
  const backLinkHanlder = useSetRecoilState<string>(backLink);

  useEffect(() => {
    if (projectIdRouter) {
      projectIdHandler(projectIdRouter);
      backLinkHanlder(`/Search/${projectIdRouter}`);
    }
  }, [projectIdRouter]);

  return (
    <>
      <NavBar page={CONTENT_TYPE.RELEASE} projectId={Number(projectIdRouter)} />
      <S.MainContainer>
        <S.OuterSection>
          <S.Section>
            <S.SearchContainer>
              <SearchSection />
            </S.SearchContainer>
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

import * as S from "../Search.styled";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { ReleaseReport, ReleaseReportResponse } from "@/types";
import ReportEditForm from "@/components/ReportEditForm";
import SearchSection from "@/components/SearchSection";
import { CONTENT_TYPE } from "@/constants";
export default function Search() {
  const router = useRouter();
  const projectIdRouter = router.query.id as string;

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

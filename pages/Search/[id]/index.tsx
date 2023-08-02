import * as S from "../Search.styled";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { ReleaseReport, ReleaseReportResponse } from "@/types";
import ReportEditForm from "@/components/ReportEditForm";
import SearchSection from "@/components/SearchSection";
export default function Search() {
  const router = useRouter();
  const projectIdRouter = router.query.id as string;
  const [releaseReportList, setReleaseReportList] =
    useState<ReleaseReportResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectIdRouter) {
      console.log(projectIdRouter);
      api.getReleaseReport(projectIdRouter).then(response => {
        setReleaseReportList(response.result);
        setLoading(false);
      });
    }
  }, [projectIdRouter, loading]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <NavBar page="releases" projectId={Number(projectIdRouter)} />
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

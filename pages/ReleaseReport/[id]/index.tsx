import * as S from "../ReleaseReport.styled";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { ReleaseReport, ReleaseReportResponse } from "@/types";
import ReportEditForm from "@/components/ReportEditForm";
import { CONTENT_TYPE } from "@/constants";
import Loading from "@/components/Loading";

export default function Report() {
  const router = useRouter();
  const projectIdRouter = router.query.id as string;
  const [releaseReportList, setReleaseReportList] =
    useState<ReleaseReportResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectIdRouter) {
      console.log(projectIdRouter);
      api
        .getReleaseReport(projectIdRouter)
        .then(response => {
          setReleaseReportList(response.result);
          setLoading(false);
        })
        .catch(error => {});
    }
  }, [projectIdRouter, loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <NavBar page={CONTENT_TYPE.RELEASE} projectId={Number(projectIdRouter)} />
      <S.MainContainer>
        <S.OuterSection>
          <S.Section>
            {releaseReportList &&
              releaseReportList.map((releaseReport: ReleaseReport) => (
                <S.ReportBox key={releaseReport.releaseId}>
                  <ReportEditForm
                    releaseReport={releaseReport}
                    projectId={projectIdRouter}
                  ></ReportEditForm>
                </S.ReportBox>
              ))}
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

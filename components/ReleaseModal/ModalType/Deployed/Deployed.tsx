import * as S from "../ReleaseModalBase.styled";
import ReleaseMember from "../../ReleaseMember";
import Title from "../../Title";
import Summary from "../../Summary";
import ContentsMarkDown from "../../ContentsMarkDown/ContentsMarkDown";
import ConnectIssues from "../../ConnectIssues";
import Comments from "@/components/Comments";
import ExportDropDown from "../../ExportDropDown";
import ConnectedIssueSection from "../../ConnectedIssueSection";
import { useRouter } from "next/router";
import EditVersion from "../../EditVersion";
import { useState, useEffect } from "react";
import { Alert } from "@/util/Alert";
import * as api from "@/api";
import ModalButtons from "@/components/ModalButtons";
import { Flow } from "@/util/Flow";

export default function Deployed({
  user,
  releaseData,
  setReleaseType,
  releaseType,
  projectId,
}: {
  user: any;
  releaseData: any;
  setReleaseType: any;
  releaseType: any;
  projectId: any;
}) {
  const router = useRouter();
  const [connectedIssues, setConnectedIssues] = useState<any>(
    releaseData?.issues,
  );
  const [issues, setIssues] = useState<any>();
  const [isLoad, setIsLoad] = useState(true);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (projectId > 0) {
      api
        .getDoneNotConnectedIssues(projectId)
        .then(response => {
          setIssues(response.result);
          setIsLoad(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [isLoad, projectId]);

  useEffect(() => {
    if (cancel) {
      Alert.releaseQuestion(
        "릴리즈 워크스페이스 창으로 나가시겠습니까?",
        projectId,
        setReleaseType,
        setCancel,
        router,
      );
    }
  }, [cancel]);

  return (
    isLoad && (
      <S.MainContainer>
        <S.LeftContainer>
          <S.LeftTopContainer>
            <EditVersion originalVersion={releaseData?.version} />
            <Title title={releaseData?.title} type="release" />
          </S.LeftTopContainer>
          <S.CenterContainer>
            <S.CenterContainerSection>
              <S.CenterSection>
                <Summary summary={releaseData?.summary} />
                <ContentsMarkDown
                  content={releaseData?.content}
                  type="release"
                />
                <S.Header>연결 가능한 이슈</S.Header>
                <ConnectIssues projectId={projectId} issues={issues} />
                <S.Header>의견</S.Header>
                <Comments
                  type="release"
                  user={user}
                  id={releaseData.releaseId}
                  opinions={releaseData.opinions}
                />
              </S.CenterSection>
            </S.CenterContainerSection>
          </S.CenterContainer>

          <S.LeftBottomContainer>
            <ReleaseMember
              projectId={releaseData.projectId}
              releaseType={releaseType}
              approvals={releaseData.approvals}
            />
          </S.LeftBottomContainer>
        </S.LeftContainer>

        <S.RightContainer>
          <S.RightContainerTop>
            <S.TopContainer>
              <ExportDropDown
                releaseId={releaseData.releaseId}
                user={user}
                approvals={releaseData.approvals}
              />
            </S.TopContainer>
            <S.ConnectedIssueHeader>연결된 이슈</S.ConnectedIssueHeader>
            <ConnectedIssueSection
              connectedIssues={connectedIssues}
              issues={issues}
            />
          </S.RightContainerTop>
          <S.RightBottomContainer>
            <ModalButtons type="one" setCancel={setCancel} />
          </S.RightBottomContainer>
        </S.RightContainer>
      </S.MainContainer>
    )
  );
}

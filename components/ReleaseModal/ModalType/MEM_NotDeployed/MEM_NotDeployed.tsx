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
import { Alert } from "@/util";
import * as api from "@/api";
import ModalButtons from "@/components/ModalButtons";
import { RELEASE_MESSAGE } from "@/constants";

export default function MEM_NotDeployed({
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
  const [title, setTitle] = useState(releaseData?.title);
  const [version, setVersion] = useState<string>(releaseData?.version ?? "");
  const [content, setContent] = useState(releaseData?.content);
  const [summary, setSummary] = useState(releaseData?.summary);
  const [cancel, setCancel] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [confirm, setConfirm] = useState(false);

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
        RELEASE_MESSAGE.LEAVE_RELEASE,
        projectId,
        setReleaseType,
        setCancel,
        router,
      );
    }
  }, [cancel]);

  console.log(releaseData.approvals);
  return (
    isLoad && (
      <S.MainContainer>
        <S.LeftContainer>
          <S.LeftTopContainer>
            <EditVersion
              originalVersion={releaseData?.version}
              version={version}
            />
            <Title title={title} type="release" />
          </S.LeftTopContainer>
          <S.CenterContainer>
            <S.CenterContainerSection>
              <S.CenterSection>
                <Summary summary={summary} />
                <ContentsMarkDown content={content} type="release" />
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
            <ModalButtons
              type="one"
              setConfirm={setConfirm}
              setCancel={setCancel}
              setDelete={setDeleteData}
            />
          </S.RightBottomContainer>
        </S.RightContainer>
      </S.MainContainer>
    )
  );
}

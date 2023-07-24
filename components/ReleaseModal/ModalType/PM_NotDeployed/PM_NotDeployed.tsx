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

export default function PM_NotDeployed({
  user,
  position,
  releaseData,
  setReleaseType,
  releaseType,
  projectId,
  nodes,
  setNodes,
  edges,
  setEdges,
}: {
  user: any;
  position: any;
  releaseData: any;
  setReleaseType: any;
  releaseType: any;
  projectId: any;
  nodes: any;
  setNodes: any;
  edges: any;
  setEdges: any;
}) {
  const router = useRouter();
  const [connectedIssues, setConnectedIssues] = useState<any>(
    releaseData.issues,
  );
  const [issues, setIssues] = useState<any>();
  const [isLoad, setIsLoad] = useState(true);
  const [title, setTitle] = useState(releaseData.title);
  const [version, setVersion] = useState<string>(releaseData.version ?? "");
  const [content, setContent] = useState(releaseData.content);
  const [summary, setSummary] = useState(releaseData.summary);
  const [deployStatus, setDeployStatus] = useState(releaseData.deployStatus);
  const [cancel, setCancel] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [confirm, setConfirm] = useState(false);

  console.log(releaseData);
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
    if (confirm) {
      EditRelease();
      setConfirm(false);
    }
    if (deleteData) {
      Alert.question("정말로 릴리즈 노트를 삭제하시겠습니까?").then(result => {
        if (result.isConfirmed) {
          api.postDeleteRelease(releaseData.releaseId).then(response => {
            console.log(response);
          });
          Alert.success("삭제되었습니다.");
          setDeleteData(false);
          setReleaseType("");
          router.push(`/Releases/${projectId}`);
        }
      });
    }
    if (cancel) {
      Alert.releaseQuestion(
        "정말로 수정창에서 나가시겠습니까?",
        projectId,
        setReleaseType,
        setCancel,
        router,
      );
    }
  }, [confirm, deleteData, cancel]);

  const EditRelease = () => {
    const data = {
      title: title,
      version: version,
      content: content,
      summary: summary,
      issues: connectedIssues.map((item: any) => item.issueId),
      deployStatus: deployStatus,
    };

    api
      .patchRelease({ releaseId: releaseData.releaseId, data: data })
      .then(response => {
        if (response.isSuccess) {
          Flow.EditNodes(projectId, response, edges, nodes, setNodes, setEdges);
        } else {
          Alert.error(response.message);
        }
      });
  };

  return (
    isLoad && (
      <S.MainContainer>
        <S.LeftContainer>
          <S.LeftTopContainer>
            <EditVersion
              originalVersion={releaseData.version}
              version={version}
              setVersion={setVersion}
            />
            <Title title={title} setTitle={setTitle} type="release" />
          </S.LeftTopContainer>
          <S.CenterContainer>
            <S.CenterContainerSection>
              <S.CenterSection>
                <Summary summary={summary} setSummary={setSummary} />
                <ContentsMarkDown
                  content={content}
                  setContent={setContent}
                  type="release"
                />
                <S.Header>이슈 연결하기</S.Header>
                <ConnectIssues
                  projectId={projectId}
                  setConnectedIssues={setConnectedIssues}
                  connectedIssues={connectedIssues}
                  issues={issues}
                  setIssues={setIssues}
                />
                <S.Header>의견</S.Header>
                <Comments type="release" opinions={releaseData.opinions} />
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
              <ExportDropDown />
            </S.TopContainer>
            <S.ConnectedIssueHeader>연결된 이슈</S.ConnectedIssueHeader>
            <ConnectedIssueSection
              connectedIssues={connectedIssues}
              setConnectedIssues={setConnectedIssues}
              setIssues={setIssues}
              issues={issues}
            />
          </S.RightContainerTop>
          <S.RightBottomContainer>
            <ModalButtons
              type="three"
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

import * as S from "../ReleaseModalBase.styled";
import ReleaseMember from "../../ReleaseMember";
import NewVersion from "../../NewVersion";
import Title from "../../Title";
import Summary from "../../Summary";
import ContentsMarkDown from "../../ContentsMarkDown/ContentsMarkDown";
import ConnectIssues from "../../ConnectIssues";
import Comments from "@/components/Comments";
import ConnectedIssueSection from "../../ConnectedIssueSection";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as api from "@/api";
import { Flow } from "@/util/Flow";
import ModalButtons from "@/components/ModalButtons";
import { Alert } from "@/util/Alert";
import { Release } from "@/util/Release";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodes, edges } from "@/storage/atom";
import { Node, Edge } from "reactflow";

export default function PM_Create({
  user,
  position,
  setReleaseType,
  releaseType,
  projectId,
}: {
  user: any;
  position: any;
  setReleaseType: any;
  releaseType: any;
  projectId: any;
}) {
  const router = useRouter();
  const [connectedIssues, setConnectedIssues] = useState<any>();
  const [issues, setIssues] = useState<any>();
  const [isLoad, setIsLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("MAJOR");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [cancel, setCancel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const currentNodes = useRecoilValue<Node[]>(nodes);
  const currentEdges = useRecoilValue<Edge[]>(edges);
  const nodesHandler = useSetRecoilState<Node[]>(nodes);
  const edgesHandler = useSetRecoilState<Edge[]>(edges);

  console.log("create bbb");
  useEffect(() => {
    api
      .getDoneNotConnectedIssues(projectId)
      .then(response => {
        setIssues(response.result);
        setIsLoad(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [isLoad]);

  useEffect(() => {
    if (confirm) {
      createRelease();
    }
    if (cancel) {
      Alert.releaseQuestion(
        "정말로 릴리즈 노트 생성을 취소하시겠습니까?",
        projectId,
        setReleaseType,
        setCancel,
        router,
      );
    }
  }, [confirm, cancel]);

  const createRelease = () => {
    const data = {
      versionType: version,
      title: title,
      summary: summary,
      content: content,
      coordX: position.x,
      coordY: position.y,
      issues: [],
    };
    const isPossible = Release.isPossibleCreate(title, summary, content);
    if (isPossible) {
      api.postNewRelease({ projectId, data }).then(response => {
        const { newNode, newEdge } = Flow.addNewNodes(response);
        nodesHandler([...currentNodes, newNode]);
        edgesHandler([...currentEdges, newEdge]);
        Alert.success("새로운 릴리즈 노트가 생성되었습니다");
        setReleaseType("");
        router.push(`/Releases/${projectId}`);
      });
    }
    setConfirm(false);
  };

  return (
    <S.MainContainer>
      <S.LeftContainer>
        <S.LeftTopContainer>
          <NewVersion version={version} setVersion={setVersion} />
          <Title title={title} setTitle={setTitle} type={"release"} />
        </S.LeftTopContainer>
        <S.CenterContainer>
          <S.CenterContainerSection>
            <S.CenterSection>
              <Summary summary={summary} setSummary={setSummary} />
              <ContentsMarkDown
                content={content}
                setContent={setContent}
                type={"release"}
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
              <Comments type={"release"} user={user} />
            </S.CenterSection>
          </S.CenterContainerSection>
        </S.CenterContainer>

        <S.LeftBottomContainer>
          <ReleaseMember projectId={projectId} releaseType={releaseType} />
        </S.LeftBottomContainer>
      </S.LeftContainer>

      <S.RightContainer>
        <S.RightContainerTop>
          <S.TopContainer></S.TopContainer>
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
            type="two"
            setCancel={setCancel}
            setConfirm={setConfirm}
          />
        </S.RightBottomContainer>
      </S.RightContainer>
    </S.MainContainer>
  );
}

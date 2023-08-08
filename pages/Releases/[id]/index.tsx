import { useRouter } from "next/router";
import Modal from "react-modal";
import ReleaseModal from "@/components/ReleaseModal";
import * as S from "../Releases.styled";
import NavBar from "@/components/NavBar";
import DropDownFlow from "@/components/DropDownFlow";
import { useEffect, useState } from "react";
import { Node, Edge } from "reactflow";
import { releaseRequest } from "@/api/release";
import { Flow } from "@/util/Flow";
import { ReleaseListGetResponse } from "@/types";
import { RELEASE_RESPONSE_DEFAULT_VALUE } from "@/constants/Nodes";
import { Alert } from "@/util/Alert";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { nodes, edges } from "@/storage/atom";

Modal.setAppElement("#__next");

export default function RelaseWorspace() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [releaseType, setReleaseType] = useState("");
  const [response, setResponse] = useState<ReleaseListGetResponse>(
    RELEASE_RESPONSE_DEFAULT_VALUE,
  );
  const projectIdRouter = router.query.id as string;
  const passProjectId = projectIdRouter ? Number(projectIdRouter) : undefined;
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const releaseId = router.query.releaseId as string;
  const idObject = { id: projectIdRouter as string };
  const nodesHandler = useSetRecoilState<any>(nodes);
  const edgesHandler = useSetRecoilState(edges);
  const currentNodes = useRecoilValue<Node[]>(nodes);
  const [key, setKey] = useState(0);

  useEffect(() => {
    releaseRequest(idObject).then(response => {
      if (response.isSuccess) {
        setResponse(response.result);
        setIsLoad(false);
        const { updatedNodes, updatedEdges } = Flow.setNewNodes(
          response.result,
        );

        nodesHandler(updatedNodes);
        edgesHandler(updatedEdges);
      }
    });
  }, [projectIdRouter, isLoad]);

  const onClickStart = () => {
    if (response.member.position === "L") {
      setReleaseType("PM_CREATE");
    } else {
      Alert.error("멤버는 릴리즈 노트를 생성할 수 없습니다.");
    }
  };

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [currentNodes]);

  if (isLoad) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <NavBar page="releases" projectId={passProjectId} />
      <S.MainContainer>
        <S.OuterSection>
          <S.Section>
            <S.ProjectInfo>
              <S.ImgWrapper>
                <img src={response.img} alt="Project Logo" />
              </S.ImgWrapper>
              <S.ProjectTitle>{response.title}</S.ProjectTitle>
              <S.GroupName>{response.team}</S.GroupName>
            </S.ProjectInfo>
            {response ? (
              <DropDownFlow
                key={key}
                user={response.member}
                setPosition={setPosition}
                setReleaseType={setReleaseType}
              />
            ) : (
              releaseType !== "PM_CREATE" && (
                <>
                  <S.MajorNode onClick={onClickStart}></S.MajorNode>
                  <S.WelcomTitle>
                    Your grand start begins here at this point
                  </S.WelcomTitle>
                </>
              )
            )}

            <S.ReleaseModal
              isOpen={!!releaseId || releaseType != ""}
              style={{
                overlay: {
                  backgroundColor: "rgba(91, 91, 91, 0.75)",
                },
              }}
            >
              <ReleaseModal
                user={response.member}
                releaseId={releaseId}
                releaseType={releaseType}
                position={position}
                setReleaseType={setReleaseType}
                projectId={response?.projectId}
              />
            </S.ReleaseModal>
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

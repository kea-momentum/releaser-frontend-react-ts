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

Modal.setAppElement("#__next");

export default function RelaseWorspace() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [releaseType, setReleaseType] = useState("");
  const [response, setResponse] = useState<ReleaseListGetResponse>(
    RELEASE_RESPONSE_DEFAULT_VALUE,
  );
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const projectIdRouter = router.query.id as string;
  const passProjectId = projectIdRouter ? Number(projectIdRouter) : undefined;
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const releaseId = router.query.releaseId as string;
  const [key, setKey] = useState(0);
  const [releases, setReleases] = useState<any>();
  const idObject = { id: projectIdRouter as string };

  useEffect(() => {
    releaseRequest(idObject).then(response => {
      if (response.isSuccess) {
        setResponse(response.result);
        setIsLoad(false);
        Flow.setNewNodes(response.result, setNodes, setEdges);
      }
    });
  }, [projectIdRouter, isLoad]);

  const onClickStart = () => {
    setReleaseType("PM_CREATE");
  };

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [nodes, edges]);

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
            {nodes.length > 0 && response ? (
              <DropDownFlow
                user={response.member}
                key={key}
                firstNodes={nodes}
                firstEdges={edges}
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
                setNodes={setNodes}
                setEdges={setEdges}
                nodes={nodes}
                edges={edges}
              />
            </S.ReleaseModal>
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

import { useRouter } from "next/router";
import { useState, useEffect, Fragment, SetStateAction, Dispatch } from "react";
import PM_Create from "./ModalType/PM_Create";
import PM_NotDeployed from "./ModalType/PM_NotDeployed";
import * as api from "@/api";
import MEM_NotDeployed from "./ModalType/\bMEM_NotDeployed";
import { Node, Edge } from "reactflow";
import { PositionType } from "@/types";
import Deployed from "./ModalType/Deployed";
type MemberType = {
  memberId: number;
  position: string;
};
export default function ReleaseModal({
  user,
  releaseId,
  position,
  releaseType,
  setReleaseType,
  projectId,
  setNodes,
  setEdges,
  nodes,
  edges,
}: {
  user: MemberType;
  releaseId?: string;
  position: PositionType;
  releaseType: string;
  setReleaseType: Dispatch<SetStateAction<string>>;
  projectId: number;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  nodes: Node[];
  edges: Edge[];
}) {
  const [releaseData, setReleaseData] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (releaseId && isLoaded === false) {
      api
        .getReleaseData(releaseId)
        .then(response => {
          setReleaseData(response.result);
          if (user.position === "L") {
            setReleaseType("PM_EDIT");
            setIsLoaded(true);
            return;
          } else {
            setReleaseType("MEM_NOTDEPLOYED");
            setIsLoaded(true);
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  return (
    <Fragment>
      {releaseType === "PM_CREATE" && (
        <>
          <PM_Create
            user={user}
            position={position}
            setReleaseType={setReleaseType}
            releaseType={releaseType}
            projectId={projectId}
            setNodes={setNodes}
            setEdges={setEdges}
            nodes={nodes}
            edges={edges}
          />
        </>
      )}
      {releaseType === "PM_EDIT" &&
        releaseData.deployStatus !== "DEPLOYED" &&
        releaseData && (
          <PM_NotDeployed
            user={user}
            position={position}
            releaseData={releaseData}
            setReleaseType={setReleaseType}
            releaseType={releaseType}
            projectId={projectId}
            setNodes={setNodes}
            setEdges={setEdges}
            nodes={nodes}
            edges={edges}
          />
        )}
      {releaseType === "MEM_NOTDEPLOYED" &&
        releaseData.deployStatus !== "DEPLOYED" &&
        releaseData && (
          <MEM_NotDeployed
            user={user}
            position={position}
            releaseData={releaseData}
            setReleaseType={setReleaseType}
            releaseType={releaseType}
            projectId={projectId}
            setNodes={setNodes}
            setEdges={setEdges}
            nodes={nodes}
            edges={edges}
          />
        )}
      {releaseData?.deployStatus === "DEPLOYED" && releaseData && (
        <Deployed
          user={user}
          releaseData={releaseData}
          setReleaseType={setReleaseType}
          releaseType={releaseType}
          projectId={projectId}
        />
      )}
    </Fragment>
  );
}

import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import PM_Create from "./ModalType/PM_Create";
import PM_NotDeployed from "./ModalType/PM_NotDeployed";
import * as api from "@/api";
import MEM_NotDeployed from "./ModalType/\bMEM_NotDeployed";

export const label = () => {
  return <div>안녕</div>;
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
  setReleases,
  releases,
}: {
  user?: any;
  releaseId?: string;
  position: any;
  releaseType: string;
  setReleaseType: any;
  projectId: any;
  setNodes: any;
  setEdges: any;
  nodes: any;
  edges: any;
  setReleases: any;
  releases: any;
}) {
  const router = useRouter();
  const [releaseData, setReleaseData] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (releaseId) {
      api
        .getReleaseData(releaseId)
        .then(response => {
          setReleaseData(response.result);
          if (user.position === "L") {
            setReleaseType("PM_EDIT");
          } else {
            setReleaseType("MEM_NOTDEPLOYED");
          }
          setIsLoaded(true);
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
      {releaseType === "PM_EDIT" && releaseData && (
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
      {releaseType === "MEM_NOTDEPLOYED" && releaseData && (
        <MEM_NotDeployed
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
    </Fragment>
  );
}

import { useRouter } from "next/router";
import { useState, useEffect, Fragment, SetStateAction, Dispatch } from "react";
import PM_Create from "./ModalType/PM_Create";
import PM_NotDeployed from "./ModalType/PM_NotDeployed";
import * as api from "@/api";
import MEM_NotDeployed from "./ModalType/\bMEM_NotDeployed";
import { Node, Edge } from "reactflow";
import { PositionType } from "@/types";
import Deployed from "./ModalType/Deployed";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { releaseType } from "@/storage/atom";

type MemberType = {
  memberId: number;
  position: string;
};
export default function ReleaseModal({
  user,
  releaseId,
  position,
  projectId,
}: {
  user: MemberType;
  releaseId?: string;
  position?: PositionType;
  projectId: number;
}) {
  const [releaseData, setReleaseData] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(true);
  const releaseTypeHandler = useSetRecoilState<any>(releaseType);
  const recoilReleaseType = useRecoilValue<any>(releaseType);
  const [newReleaseId, setNewReleaseId] = useState(releaseId);

  console.log(releaseId);
  useEffect(() => {
    if (releaseId) {
      api
        .getReleaseData(releaseId)
        .then(response => {
          setReleaseData(response.result);
          if (user.position === "L") {
            releaseTypeHandler("PM_EDIT");
            setIsLoaded(false);
            return;
          } else {
            releaseTypeHandler("MEM_NOTDEPLOYED");
            setIsLoaded(false);
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      releaseTypeHandler("PM_CREATE");
    }
  }, [isLoaded]);

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      {recoilReleaseType === "PM_CREATE" && (
        <>
          <PM_Create
            user={user}
            setReleaseType={releaseTypeHandler}
            releaseType={recoilReleaseType}
            position={position}
            projectId={projectId}
          />
        </>
      )}
      {recoilReleaseType === "PM_EDIT" &&
        releaseData.deployStatus !== "DEPLOYED" &&
        releaseData && (
          <PM_NotDeployed
            user={user}
            setReleaseType={releaseTypeHandler}
            releaseType={recoilReleaseType}
            releaseData={releaseData}
            projectId={projectId}
          />
        )}
      {recoilReleaseType === "MEM_NOTDEPLOYED" &&
        releaseData.deployStatus !== "DEPLOYED" &&
        releaseData && (
          <MEM_NotDeployed
            user={user}
            releaseType={recoilReleaseType}
            setReleaseType={releaseTypeHandler}
            releaseData={releaseData}
            projectId={projectId}
          />
        )}
      {releaseData?.deployStatus === "DEPLOYED" && releaseData && (
        <Deployed
          user={user}
          setReleaseType={releaseTypeHandler}
          releaseType={recoilReleaseType}
          releaseData={releaseData}
          projectId={projectId}
        />
      )}
    </Fragment>
  );
}

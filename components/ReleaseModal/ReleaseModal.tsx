import { useState, useEffect, Fragment } from "react";
import PM_Create from "./ModalType/PM_Create";
import PM_NotDeployed from "./ModalType/PM_NotDeployed";
import * as api from "@/api";
import MEM_NotDeployed from "./ModalType/\bMEM_NotDeployed";
import { PositionType } from "@/types";
import Deployed from "./ModalType/Deployed";
import { RELEASE_TYPE, USER_TYPE, PAGE } from "@/constants";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

  useEffect(() => {
    if (releaseId && releaseId !== PAGE.CREATE_RELEASE) {
      api
        .getReleaseData(releaseId)
        .then(response => {
          setReleaseData(response.result);
          if (user.position === USER_TYPE.PM) {
            releaseTypeHandler(RELEASE_TYPE.PM_EDIT);
            setIsLoaded(false);
            return;
          } else {
            releaseTypeHandler(RELEASE_TYPE.MEM_NOTDEPLOYED);
            setIsLoaded(false);
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (user.position === USER_TYPE.PM) {
        releaseTypeHandler(RELEASE_TYPE.PM_CREATE);
        setIsLoaded(false);
      }
    }
  }, [isLoaded]);

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      {recoilReleaseType === RELEASE_TYPE.PM_CREATE && (
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
      {recoilReleaseType === RELEASE_TYPE.PM_EDIT &&
        releaseData?.deployStatus !== RELEASE_TYPE.DEPLOYED &&
        releaseData && (
          <PM_NotDeployed
            user={user}
            setReleaseType={releaseTypeHandler}
            releaseType={recoilReleaseType}
            releaseData={releaseData}
          />
        )}
      {recoilReleaseType === RELEASE_TYPE.MEM_NOTDEPLOYED &&
        releaseData?.deployStatus !== RELEASE_TYPE.DEPLOYED &&
        releaseData && (
          <MEM_NotDeployed
            user={user}
            releaseType={recoilReleaseType}
            setReleaseType={releaseTypeHandler}
            releaseData={releaseData}
            projectId={projectId}
          />
        )}
      {releaseData?.deployStatus === RELEASE_TYPE.DEPLOYED && releaseData && (
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

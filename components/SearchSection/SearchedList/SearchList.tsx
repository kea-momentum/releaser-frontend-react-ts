import React, { Fragment } from "react"; // 이 부분을 추가해야 합니다
import { SearchResponseType } from "@/types";
import * as S from "./SearchList.styled";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { nodes, edges, user, releaseType } from "@/storage/atom";
import ReleaseModal from "@/components/ReleaseModal";
import { useState, useEffect } from "react";

export default function SearchList({
  searchedResult,
  projectId,
}: {
  searchedResult: SearchResponseType;
  projectId: string;
}) {
  console.log(searchedResult);
  const recoilUser = useRecoilValue<any>(user);
  const recoilReleaseType = useRecoilValue<any>(releaseType);
  const resetReleaseType = useResetRecoilState(releaseType);
  const releaseTypeHandler = useSetRecoilState(releaseType);
  const [clickedReleaseId, setClickedReleaseId] = useState(0);

  useEffect(() => {
    resetReleaseType();
  }, []);

  const onClickRelease = (releaseId: number) => {
    releaseTypeHandler("NOT_DECIDED");
    setClickedReleaseId(releaseId);
  };

  return (
    <Fragment>
      <div>
        {searchedResult.getIssueInfoList.map(issue => (
          <S.ListContainer key={issue.issueId}>{issue.title}</S.ListContainer>
        ))}
      </div>
      <div>
        {searchedResult.getReleaseInfoList.map(release => (
          <Link
            href={`/Search/${projectId}/?releaseId=${release.releaseId}`}
            as={`/Search/${projectId}/?releaseId=${release.releaseId}`}
          >
            <S.ListContainer
              key={release.releaseId}
              onClick={() => onClickRelease(release.releaseId)}
            >
              {release.title}
            </S.ListContainer>
          </Link>
        ))}
      </div>
      <S.ReleaseModal
        isOpen={recoilReleaseType !== ""}
        style={{
          overlay: {
            backgroundColor: "rgba(91, 91, 91, 0.75)",
          },
        }}
      >
        <ReleaseModal
          user={recoilUser}
          releaseId={clickedReleaseId.toString()}
          projectId={44}
        />
      </S.ReleaseModal>
    </Fragment>
  );
}

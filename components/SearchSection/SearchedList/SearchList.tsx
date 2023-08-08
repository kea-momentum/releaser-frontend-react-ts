import React, { Fragment } from "react"; // 이 부분을 추가해야 합니다
import { SearchResponseType } from "@/types";
import * as S from "./SearchList.styled";
import Link from "next/link";

export default function SearchList({
  searchedResult,
}: {
  searchedResult: SearchResponseType;
}) {
  console.log(searchedResult);

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
            href={`/Releases/44/?releaseId=${release.releaseId}`}
            as={`/Releases/44/?releaseId=${release.releaseId}`}
          >
            <S.ListContainer key={release.releaseId}>
              {release.title}
            </S.ListContainer>
          </Link>
        ))}
      </div>
    </Fragment>
  );
}

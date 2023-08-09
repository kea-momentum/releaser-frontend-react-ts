import React, { Fragment } from "react"; // 이 부분을 추가해야 합니다
import { SearchResponseType } from "@/types";
import * as S from "./SearchList.styled";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { nodes, edges, user, releaseType } from "@/storage/atom";
import ReleaseModal from "@/components/ReleaseModal";
import { useState, useEffect } from "react";
import * as ST from "../SearchTag/SearchTag.styled";
import { TAG_COLOR, SEARCH_TAG_COLOR } from "@/constants/Tag";
import { formatDate } from "@/util/functions/sliceData";
import { TagType } from "@/types/issue";

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
          <S.ListContainer key={issue.issueId}>
            <S.ListLeftContainer>
              <S.ListType color="#E57878">Issue</S.ListType>
              <S.TitleContainer>{issue.title}</S.TitleContainer>
            </S.ListLeftContainer>
            <S.TagsSection>
              <S.TagContainer>
                <ST.ListSearchTagContainer color={SEARCH_TAG_COLOR["VERSION"]}>
                  <ST.ListTextContainer>
                    {issue.releaseVersion ? issue.releaseVersion : "연결 전"}
                  </ST.ListTextContainer>
                </ST.ListSearchTagContainer>
              </S.TagContainer>
              <S.TagContainer>
                <ST.ListSearchTagContainer color={SEARCH_TAG_COLOR["WRITER"]}>
                  <ST.ListTextContainer>
                    {issue.managerName}
                  </ST.ListTextContainer>
                </ST.ListSearchTagContainer>
              </S.TagContainer>
              <S.TagContainer>
                <ST.ListSearchTagContainer
                  color={TAG_COLOR[issue.tag as TagType]}
                >
                  <ST.ListTextContainer>{issue.tag}</ST.ListTextContainer>
                </ST.ListSearchTagContainer>
              </S.TagContainer>
              <S.TagContainer>
                <ST.ListSearchTagContainer color={SEARCH_TAG_COLOR["DATE"]}>
                  <ST.ListTextContainer>
                    {formatDate(issue.endDate)?.shortDateTime}
                  </ST.ListTextContainer>
                </ST.ListSearchTagContainer>
              </S.TagContainer>
            </S.TagsSection>
          </S.ListContainer>
        ))}
      </div>
      <div>
        {searchedResult.getReleaseInfoList.map(release => (
          <Link
            href={`/Search/${projectId}/?releaseId=${release.releaseId}`}
            as={`/Search/${projectId}/?releaseId=${release.releaseId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <S.ListContainer
              key={release.releaseId}
              onClick={() => onClickRelease(release.releaseId)}
            >
              <S.ListLeftContainer>
                <S.ListType color="#81a0d3">Release</S.ListType>
                <S.TitleContainer>{release.title}</S.TitleContainer>
              </S.ListLeftContainer>
              <S.TagsSection>
                <S.TagContainer>
                  <ST.ListSearchTagContainer
                    color={SEARCH_TAG_COLOR["VERSION"]}
                  >
                    <ST.ListTextContainer>
                      {release.version}
                    </ST.ListTextContainer>
                  </ST.ListSearchTagContainer>
                </S.TagContainer>
                <S.TagContainer>
                  <ST.ListSearchTagContainer color={"#ED726F"}>
                    <ST.ListTextContainer>PM</ST.ListTextContainer>
                  </ST.ListSearchTagContainer>
                </S.TagContainer>
              </S.TagsSection>
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

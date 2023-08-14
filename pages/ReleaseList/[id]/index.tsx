import * as S from "../ReleaseList.styled";
import { useRouter } from "next/router";
import Modal from "react-modal";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import * as api from "@/api";
import ReleaseModal from "@/components/ReleaseModal";
import { CONTENT_TYPE, PAGE } from "@/constants";
import { ReleaseReport, TagListType } from "@/types";
import Tag from "@/components/Tag";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  user,
  releaseType,
  projectId as recoilProjectId,
  backLink,
} from "@/storage/atom";
import { MODAL_STYLE } from "@/constants";
import Loading from "@/components/Loading";

Modal.setAppElement("#__next");

export default function RelaseWorspace() {
  const router = useRouter();
  console.log(router.query.id);
  const projectId = router.query.id as string;
  const [releaseList, setReleaseList] = useState<ReleaseReport[]>();
  const [isLoad, setIsLoad] = useState(true);
  const releaseTypeHandler = useSetRecoilState(releaseType);
  const [clickedReleaseId, setClickedReleaseId] = useState(0);
  const recoilReleaseType = useRecoilValue<any>(releaseType);
  const recoilUser = useRecoilValue<any>(user);
  const currentProjectId = useRecoilValue<any>(recoilProjectId);
  const projectIdHandler = useSetRecoilState<string>(recoilProjectId);
  const backLinkHanlder = useSetRecoilState<string>(backLink);

  useEffect(() => {
    if (projectId) {
      api
        .getReleaseReport(projectId)
        .then(response => {
          console.log(response.result);
          setReleaseList(response.result);
          projectIdHandler(projectId);
          backLinkHanlder(`/ReleaseList/${projectId}`);

          setIsLoad(false);
        })
        .catch(error => {});
    }
  }, [projectId]);

  const onClickRelease = (releaseId: number) => {
    releaseTypeHandler("NOT_DECIDED");
    setClickedReleaseId(releaseId);
  };

  if (isLoad) {
    <Loading />;
  }
  return (
    <>
      <NavBar page={CONTENT_TYPE.RELEASE} />
      <S.MainContainer>
        <S.OuterSection>
          <S.Section>
            <S.SearchContainer>
              <S.SearchColumnTitle>
                <S.VersionColumn> 버전 </S.VersionColumn>
                <S.DescriptionColumn>릴리즈 제목</S.DescriptionColumn>
                <S.TitleColumn>연결 된 이슈</S.TitleColumn>
              </S.SearchColumnTitle>
              <S.ReleaseContentList>
                {releaseList?.map(release => (
                  <S.SearchColumn
                    onClick={() => onClickRelease(release.releaseId)}
                  >
                    <S.VersionColumn>{release.releaseVersion}</S.VersionColumn>
                    <S.DescriptionColumn>
                      {release.releaseTitle}
                    </S.DescriptionColumn>
                    <S.TitleColumn>
                      {release.tagsList.map(tag => (
                        <S.TagListContainer>
                          <S.TagContainer>
                            <Tag tagText={tag.tag} />
                          </S.TagContainer>
                          <S.IssueTitleContainer>
                            {tag.titleList.map((titleObject, index) => (
                              <li key={index}>{titleObject.title}</li>
                            ))}
                          </S.IssueTitleContainer>
                        </S.TagListContainer>
                      ))}
                    </S.TitleColumn>
                  </S.SearchColumn>
                ))}
              </S.ReleaseContentList>
              <S.ReleaseModal
                isOpen={recoilReleaseType !== ""}
                style={MODAL_STYLE}
              >
                <ReleaseModal
                  user={recoilUser}
                  releaseId={clickedReleaseId.toString()}
                  projectId={currentProjectId}
                />
              </S.ReleaseModal>
            </S.SearchContainer>
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

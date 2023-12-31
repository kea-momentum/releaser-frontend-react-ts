import * as S from "../../../styles/pageStyledFile/Releases.styled";
import { useRouter } from "next/router";
import Modal from "react-modal";
import ReleaseModal from "@/components/ReleaseModal";
import NavBar from "@/components/NavBar";
import DropDownFlow from "@/components/DropDownFlow";
import { ListIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Node } from "reactflow";
import { releaseRequest } from "@/api/release";
import { Flow, Alert } from "@/util";
import { ReleaseListGetResponse } from "@/types";
import Link from "next/link";
import {
  RELEASE_RESPONSE_DEFAULT_VALUE,
  MODAL_STYLE,
  RELEASE_MESSAGE,
  RELEASE_TYPE,
  USER_TYPE,
  CONTENT_TYPE,
  PAGE,
} from "@/constants";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  nodes,
  edges,
  user,
  releaseType,
  projectId,
  backLink,
} from "@/storage/atom";
import UserGuide from "@/components/UserGuide";
import Loading from "@/components/Loading";

Modal.setAppElement("#__next");

export default function RelaseWorspace() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
  const currentUser = useRecoilValue(user);
  const userHandler = useSetRecoilState(user);
  const recoilReleaseType = useRecoilValue<any>(releaseType);
  const resetReleaseType = useResetRecoilState(releaseType);
  const releaseTypeHandler = useSetRecoilState<any>(releaseType);
  const projectIdHandler = useSetRecoilState<string>(projectId);
  const backLinkHandler = useSetRecoilState(backLink);
  const [key, setKey] = useState(0);
  const [openGuide, setOpenGuide] = useState(false);

  useEffect(() => {
    if (Number(releaseId) <= 0) {
      resetReleaseType();
    } else {
      releaseTypeHandler("PM_NOTDEPLOYED");
    }
  }, []);

  useEffect(() => {
    releaseRequest(idObject).then(response => {
      if (response.isSuccess) {
        setResponse(response.result);
        const { updatedNodes, updatedEdges } = Flow.setNewNodes(
          response.result,
        );

        nodesHandler(updatedNodes);
        edgesHandler(updatedEdges);
        userHandler(response.result.member);
        projectIdHandler(projectIdRouter);
        backLinkHandler(`/Releases/${projectIdRouter}`);
        window.sessionStorage.setItem(
          "memberId",
          response.result.member.memberId.toString(),
        );
        window.sessionStorage.setItem(
          "position",
          response.result.member.position,
        );

        setIsLoad(false);
      }
    });
  }, [projectIdRouter, isLoad]);

  const onClickStart = () => {
    if (response.member.position === USER_TYPE.PM) {
      releaseTypeHandler("PM_CREATE");
    } else {
      Alert.error(RELEASE_MESSAGE.MEMBER_CANNOT_CREATE);
    }
  };

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [currentNodes]);

  if (isLoad) {
    return <Loading />;
  }
  return (
    <>
      <NavBar page={CONTENT_TYPE.RELEASE} projectId={passProjectId} />
      <S.MainContainer>
        <S.OuterSection>
          <S.Section key={key}>
            <S.ProjectInfo>
              <S.ImgWrapper>
                <img src={response.img} alt="Project Logo" />
              </S.ImgWrapper>
              <S.ProjectTitle>{response.title}</S.ProjectTitle>
              <S.GroupName>{response.team}</S.GroupName>
            </S.ProjectInfo>
            <S.UserGuidContainer
              enable={openGuide}
              onClick={() => {
                setOpenGuide(!openGuide);
              }}
            >
              <UserGuide />
            </S.UserGuidContainer>

            {currentNodes.length > 0 ? (
              <DropDownFlow user={response.member} setPosition={setPosition} />
            ) : (
              <>
                <Link
                  href={`${projectIdRouter}/?releaseId=${PAGE.CREATE_RELEASE}`}
                  as={`${projectIdRouter}/?releaseId=${PAGE.CREATE_RELEASE}`}
                >
                  <S.MajorNode onClick={onClickStart}></S.MajorNode>
                  <S.WelcomTitle>
                    Your grand start begins here at this point
                  </S.WelcomTitle>
                </Link>
              </>
            )}

            {(Number(releaseId) > 0 || releaseId === PAGE.CREATE_RELEASE) && (
              <S.ReleaseModal
                isOpen={releaseId !== undefined || recoilReleaseType !== ""}
                style={MODAL_STYLE}
              >
                <ReleaseModal
                  user={currentUser}
                  releaseId={releaseId}
                  position={position}
                  projectId={response?.projectId}
                />
              </S.ReleaseModal>
            )}
          </S.Section>
        </S.OuterSection>
      </S.MainContainer>
    </>
  );
}

import * as S from "./NavButtons.styled";
import Notification from "@/public/images/Bell.svg";
import Docs from "@/public/images/Docs.svg";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import MemberInvite from "@/components/MemberInvite";
import { Fragment, useState } from "react";
import { MODAL_STYLE, CONTENT_TYPE } from "@/constants";
import NotificationModal from "@/components/NotificationModal";
import { ListIcon } from "lucide-react";
import { projectId as recoilProjectId } from "@/storage/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { backLink } from "@/storage/atom";

export default function NavButtons({
  type,
  projectId,
}: {
  type: string;
  projectId?: number;
}) {
  const router = useRouter();
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const currentProjectId = useRecoilValue<any>(recoilProjectId);
  const backLinkHandler = useSetRecoilState<any>(backLink);

  const onClickGroup = () => {
    setIsOpenGroup(!isOpenGroup);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.LinkButtonContainer>
      {type === CONTENT_TYPE.RELEASE && (
        <Fragment>
          <S.IconContainer>
            <SearchIcon
              onClick={() => {
                router.push(`/Search/${currentProjectId}`);
                backLinkHandler(`/Search/${currentProjectId}`);
              }}
            />
          </S.IconContainer>
          <S.IconContainer>
            <Docs
              onClick={() => {
                router.push(`/ReleaseReport/${currentProjectId}`);
                backLinkHandler(`/ReleaseReport/${currentProjectId}`);
              }}
            />
          </S.IconContainer>
          <S.IconContainer>
            <ListIcon
              onClick={() => {
                router.push(`/ReleaseList/${currentProjectId}`);
                backLinkHandler(`/ReleaseList/${currentProjectId}`);
              }}
            />
          </S.IconContainer>
        </Fragment>
      )}
      <S.IconContainer>
        <Notification onClick={openModal} />
        <S.NotificationModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={MODAL_STYLE}
        >
          <NotificationModal />
        </S.NotificationModal>
      </S.IconContainer>

      {type === CONTENT_TYPE.RELEASE && (
        <S.ReleaseButton
          onClick={() => {
            router.push(`/IssueBoard/${currentProjectId}`);
          }}
        >
          Issues
        </S.ReleaseButton>
      )}
      {type === CONTENT_TYPE.ISSUE && (
        <S.IssueButton
          onClick={() => {
            router.push(`/Releases/${currentProjectId}`);
          }}
        >
          Releases
        </S.IssueButton>
      )}
      <S.GroupButton onClick={onClickGroup}>Group</S.GroupButton>
      {isOpenGroup && (
        <MemberInvite isOpen={isOpenGroup} setIsOpen={setIsOpenGroup} />
      )}
    </S.LinkButtonContainer>
  );
}

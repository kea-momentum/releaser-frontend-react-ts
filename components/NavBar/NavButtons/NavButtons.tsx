import * as S from "./NavButtons.styled";
import Notification from "@/public/images/Bell.svg";
import Docs from "@/public/images/Docs.svg";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import MemberInvite from "@/components/MemberInvite";
import { Fragment, useState } from "react";
import { MODAL_STYLE, CONTENT_TYPE } from "@/constants";
import NotificationModal from "@/components/NotificationModal";

export default function NavButtons({
  type,
  projectId,
}: {
  type: string;
  projectId?: number;
}) {
  const router = useRouter();
  const [isOpenGroup, setIsOpenGroup] = useState(false);

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
                router.push(`/Search/${projectId}`);
              }}
            />
          </S.IconContainer>
          <S.IconContainer>
            <Docs
              onClick={() => {
                router.push(`/ReleaseReport/${projectId}`);
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
            router.push(`/IssueBoard/${projectId}`);
          }}
        >
          Issues
        </S.ReleaseButton>
      )}
      {type === CONTENT_TYPE.ISSUE && (
        <S.IssueButton
          onClick={() => {
            router.push(`/Releases/${projectId}`);
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

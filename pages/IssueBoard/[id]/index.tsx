import React, { Fragment, useState, useEffect } from "react";
import * as S from "../IssueBoard.styled";
import NavBar from "@/components/NavBar";
import AddButton from "@/components/AddButton";
import DoneImg from "@/public/images/Issue_Done.svg";
import InProgressImg from "@/public/images/Issue_InProgress.svg";
import NotStartedImg from "@/public/images/Issue_NotStarted.svg";
import IssueBoardSection from "@/components/IssueBoardSection";
import IssueModal from "@/components/IssueModal";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { issueBoardList, changeIssueStatus } from "@/api/issue";
import { IssueData } from "@/types/issue";
import { BrowserRouter as Router } from "react-router-dom";
import { MODAL_STYLE, CONTENT_TYPE } from "@/constants";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Alert } from "@/util";

export default function IssueBoard() {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const router = useRouter();
  const projectIdRouter = router.query.id;
  const passProjectId = projectIdRouter ? Number(projectIdRouter) : undefined;

  const issueId = Number(router.query.issueId);

  const [doneList, setDoneList] = useState<IssueData[]>([]);
  const [inProgressList, setInProgressList] = useState<IssueData[]>([]);
  const [notStartedList, setNotStartedList] = useState<IssueData[]>([]);

  useEffect(() => {
    if (passProjectId) {
      const idObject = { id: passProjectId };
      issueBoardList(idObject).then(response => {
        if (response.isSuccess) {
          setDoneList(response.result.getDoneList);
          setInProgressList(response.result.getInProgressList);
          setNotStartedList(response.result.getNotStartedList);
        }
      });
    }
  }, [passProjectId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveIssue = (issueData: IssueData) => {
    setNotStartedList(prevNotStartedList => [...prevNotStartedList, issueData]);
  };

  const handleDragEnd = (result: DropResult) => {
      const {source, destination} = result;
      console.log(">>> source: ", source);
      console.log(">>> destination: ", destination);

      if(destination) {
        const sourceList = getListByDroppableId(source.droppableId);
        const destList = getListByDroppableId(destination?.droppableId);

        const [movedItem] = sourceList.splice(source.index, 1);
        destList.splice(destination?.index, 0, movedItem);

        const draggedIssueId = movedItem.issueId;
        changeIssueStatus(draggedIssueId, destination.droppableId).then(response => {
          if(response.isSuccess) {
            setDoneList([...doneList]);
            setInProgressList([...inProgressList]);
            setNotStartedList([...notStartedList]);
          } else {
            Alert.warn("이슈 상태 변경 실패", response.message);
          }
        });
      }
  };
  const getListByDroppableId = (droppableId) => {
    switch (droppableId) {
      case "Done":
        return doneList;
      case "In_Progress":
        return inProgressList;
      case "Not_Started":
        return notStartedList;
      default:
        return [];
    }
  };
  const [enabled, setEnabled] = useState<boolean>(false);
  useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return() => {
          cancelAnimationFrame(animation);
          setEnabled(false);
      }
  }, []);
  if(!enabled) {
      return null;
  }

  return (
    <Fragment>
      <NavBar page={CONTENT_TYPE.ISSUE} />
      <S.Wrapper>
        <S.MainContainer>
          <S.TitleWrapper>
            <S.PageTitle style={{ marginLeft: "10px" }}>Issues</S.PageTitle>
            <AddButton onClick={openModal} type="issue" />
            <S.IssueModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={MODAL_STYLE}
            >
              <Router>
                <IssueModal
                  onClose={closeModal}
                  // type="create"
                  onSave={handleSaveIssue}
                  projectId={passProjectId}
                  issueId={issueId}
                />
              </Router>
            </S.IssueModal>
          </S.TitleWrapper>

          <DragDropContext onDragEnd={handleDragEnd}>
          <S.SectionWrapper>
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle>Done</S.SectionTitle>
                <DoneImg />
              </S.TitleWrapper>
              <S.IssueContainer style={{ float: "left" }}>
                <IssueBoardSection type="Done" issueList={doneList} />
              </S.IssueContainer>
            </S.SectionContent>
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle style={{ marginLeft: "2vw" }}>
                  In Progress
                </S.SectionTitle>
                <InProgressImg />
              </S.TitleWrapper>
              <S.IssueContainer>
                <IssueBoardSection type="In_Progress" issueList={inProgressList} />
              </S.IssueContainer>
            </S.SectionContent>
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle style={{ marginLeft: "3vw" }}>
                  Not Started
                </S.SectionTitle>
                <NotStartedImg />
              </S.TitleWrapper>
              <S.IssueContainer style={{ float: "right" }}>
                <IssueBoardSection type="Not_Started" issueList={notStartedList} />
              </S.IssueContainer>
            </S.SectionContent>
          </S.SectionWrapper>
          </DragDropContext>
        </S.MainContainer>
      </S.Wrapper>
    </Fragment>
  );
}

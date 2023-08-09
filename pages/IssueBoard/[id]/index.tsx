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
import { issueBoardList } from "@/api/issue";
import { IssueData } from "@/types/issue";
import { BrowserRouter as Router } from "react-router-dom";
import { MODAL_STYLE } from "@/constants";

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

  // const onDragEnd = ({source, destination}: DropResult) => {
  //     console.log(">>> source: ", source);
  //     console.log(">>> destination: ", destination);
  // };
  // const [enabled, setEnabled] = useState<boolean>(false);
  // useEffect(() => {
  //     const animation = requestAnimationFrame(() => setEnabled(true));
  //     return() => {
  //         cancelAnimationFrame(animation);
  //         setEnabled(false);
  //     }
  // }, []);
  // if(!enabled) {
  //     return null;
  // }

  return (
    <Fragment>
      <NavBar page="issues" />
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
                  type="create"
                  onSave={handleSaveIssue}
                  projectId={passProjectId}
                  issueId={issueId}
                />
              </Router>
            </S.IssueModal>
          </S.TitleWrapper>

          {/* <DragDropContext onDragEnd={onDragEnd}> */}
          <S.SectionWrapper>
            {/* <Droppable droppableId="Done">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}> */}
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle>Done</S.SectionTitle>
                <DoneImg />
              </S.TitleWrapper>
              <S.IssueContainer style={{ float: "left" }}>
                <IssueBoardSection type="Done" issueList={doneList} />
              </S.IssueContainer>
            </S.SectionContent>
            {/* )}
                            </Droppable> */}

            {/* <Droppable droppableId="InProgress">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}> */}
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle style={{ marginLeft: "2vw" }}>
                  In Progress
                </S.SectionTitle>
                <InProgressImg />
              </S.TitleWrapper>
              <S.IssueContainer>
                <IssueBoardSection
                  type="In_Progress"
                  issueList={inProgressList}
                />
              </S.IssueContainer>
            </S.SectionContent>
            {/* )}
                            </Droppable> */}

            {/* <Droppable droppableId="NotStarted">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}> */}
            <S.SectionContent>
              <S.TitleWrapper>
                <S.SectionTitle style={{ marginLeft: "3vw" }}>
                  Not Started
                </S.SectionTitle>
                <NotStartedImg />
              </S.TitleWrapper>
              <S.IssueContainer style={{ float: "right" }}>
                <IssueBoardSection
                  type="Not_Started"
                  issueList={notStartedList}
                />
              </S.IssueContainer>
            </S.SectionContent>
            {/* )}
                            </Droppable> */}
          </S.SectionWrapper>
          {/* </DragDropContext> */}
        </S.MainContainer>
      </S.Wrapper>
    </Fragment>
  );
}

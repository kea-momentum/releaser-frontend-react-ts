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
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Alert } from "@/util/Alert";

export default function IssueBoard() {
    useEffect(() => {
        Modal.setAppElement('#__next');
    }, []);

    const router = useRouter();
    const projectIdRouter = router.query.id;
    const passProjectId = projectIdRouter ? Number(projectIdRouter) : undefined;

    const issueId = router.query.issueId as string;

    const [doneList, setDoneList] = useState<IssueData[]>([]);
    const [inProgressList, setInProgressList] = useState<IssueData[]>([]);
    const [notStartedList, setNotStartedList] = useState<IssueData[]>([]);

    useEffect(() => {
        if(passProjectId) {
            const idObject = {id: passProjectId};
            issueBoardList(idObject).then(response => {
                if(response.isSuccess) {
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
        setNotStartedList((prevNotStartedList) => [...prevNotStartedList, issueData]);
    };

    const handleDragEnd = (result: DropResult) => {
        if(!result.destination) {
            return;
        }

        // alert(result.draggableId + " & " + result.source.droppableId + " & " + result.destination.droppableId);

        if(result.source.droppableId !== result.destination.droppableId) {
            changeIssueStatus(result.draggableId, result.destination.droppableId).then(response => {
                if(response.isSuccess) {
                    console.log("===RESP===\n", response.result);
                } else {
                    Alert.warn("이슈 상태 변경 실패", response.message);
                }
            });
        }
    };

    return (
        <Fragment>
            <NavBar page="issues" />
            <S.Wrapper>
                <S.MainContainer>
                    <S.TitleWrapper>
                        <S.PageTitle style={{marginLeft: "10px"}}>
                            Issues
                        </S.PageTitle>
                        <AddButton onClick={openModal} type="issue" />
                        <S.IssueModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            style={{
                                overlay: {
                                backgroundColor: "rgba(91, 91, 91, 0.75)",
                                }
                            }}
                        >
                            <IssueModal onClose={closeModal} type="create" onSave={handleSaveIssue} projectId={passProjectId} issueId={issueId} />
                        </S.IssueModal>
                    </S.TitleWrapper>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <S.SectionWrapper>
                            <Droppable droppableId="DONE" type="ISSUE">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}>
                                        <S.TitleWrapper>
                                            <S.SectionTitle>
                                                Done
                                            </S.SectionTitle>
                                            <DoneImg />
                                        </S.TitleWrapper>
                                        <S.IssueContainer style={{float: "left"}}>
                                            <IssueBoardSection type="Done" issueList={doneList} />
                                        </S.IssueContainer>
                                    </S.SectionContent>
                                )}
                            </Droppable>

                            <Droppable droppableId="IN_PROGRESS" type="ISSUE">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}>
                                        <S.TitleWrapper>
                                            <S.SectionTitle style={{marginLeft: "2vw"}}>
                                                In Progress
                                            </S.SectionTitle>
                                            <InProgressImg />
                                        </S.TitleWrapper>
                                        <S.IssueContainer>
                                            <IssueBoardSection type="In_Progress" issueList={inProgressList} />
                                        </S.IssueContainer>
                                    </S.SectionContent>
                                )}
                            </Droppable>

                            <Droppable droppableId="NOT_STARTED" type="ISSUE">
                                {(provided) => (
                                    <S.SectionContent ref={provided.innerRef} {...provided.droppableProps}>
                                        <S.TitleWrapper>
                                            <S.SectionTitle style={{marginLeft: "3vw"}}>
                                                Not Started
                                            </S.SectionTitle>
                                            <NotStartedImg />
                                        </S.TitleWrapper>
                                        <S.IssueContainer style={{float: "right"}}>
                                            <IssueBoardSection type="Not_Started" issueList={notStartedList} />
                                        </S.IssueContainer>
                                    </S.SectionContent>
                                )}
                            </Droppable>

                        </S.SectionWrapper>
                    </DragDropContext>

                </S.MainContainer>
            </S.Wrapper>
        </Fragment>
    );   
}
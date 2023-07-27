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
        console.log("===Not Started List: ");
        console.log(notStartedList);
    }, [notStartedList]);

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
    
    // useEffect(() => { // TODO: 지울거
    //     console.log("===DONE list");
    //     console.log(doneList);
    //     console.log("===IN PROGRESS list");
    //     console.log(inProgressList);
    //     console.log("===NOT STARTED list");
    //     console.log(notStartedList);
    // }, [doneList, inProgressList, notStartedList]);

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

                    <S.SectionWrapper>
                        <S.SectionContent>
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

                        <S.SectionContent>
                            <S.TitleWrapper>
                                <S.SectionTitle style={{marginLeft: "2vw"}}>
                                    In Progress
                                </S.SectionTitle>
                                <InProgressImg />
                            </S.TitleWrapper>
                            
                            <S.IssueContainer>
                                <IssueBoardSection type="InProgress" issueList={inProgressList} />
                            </S.IssueContainer>

                        </S.SectionContent>

                        <S.SectionContent>
                            <S.TitleWrapper>
                                <S.SectionTitle style={{marginLeft: "3vw"}}>
                                    Not Started
                                </S.SectionTitle>
                                <NotStartedImg />
                            </S.TitleWrapper>
                            
                            <S.IssueContainer style={{float: "right"}}>
                                <IssueBoardSection type="NotStarted" issueList={notStartedList} />
                            </S.IssueContainer>

                        </S.SectionContent>
                    </S.SectionWrapper>
                </S.MainContainer>
            </S.Wrapper>
        </Fragment>
    );   
}
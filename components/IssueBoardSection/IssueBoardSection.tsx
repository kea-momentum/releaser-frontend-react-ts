import React, {useEffect, useState} from "react";
import * as S from "./IssueBoardSection.styled";
import { IssueData } from "@/types/issue";
import IssuePreview from "../IssuePreview";
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd";
import { BrowserRouter as Router } from "react-router-dom";

interface IssueBoardSectionProps {
    type: string;
    issueList?: IssueData[];
    // onDragEnd: (result: DropResult, issueId: number) => void;
}

export default function IssueBoardSection({type, issueList}: IssueBoardSectionProps) {
    let backgroundColor = "#81A0D3";
    if(type === "In_Progress") {
        backgroundColor = "#FF6262";
    } else if(type === "Not_Started") {
        backgroundColor = "#FFCE70";
    }

    const [deletedIssues, setDeletedIssues] = useState<number[]>([]);
    const handleDeleteIssue = (issueId: number) => {
        setDeletedIssues((prevDeletedIssues) => [...prevDeletedIssues, issueId]);
    };

    const [filteredIssueList, setFilteredIssueList] = useState<IssueData[]>(issueList || []);
    useEffect(() => {
        issueList && setFilteredIssueList(issueList?.filter(
            (issue) => !deletedIssues.includes(issue.issueId)
        ));
    }, [issueList, deletedIssues]);

    const handleEditIssue = (issueData: IssueData) => {
        const issueIndex = filteredIssueList?.findIndex(
            (issue) => issue.issueId === issueData.issueId
        );

        if(issueIndex !== -1) {
            const updatedIssueList = [...filteredIssueList];
            updatedIssueList[issueIndex] = issueData;
            setFilteredIssueList(updatedIssueList);
        }
    };

    const handlePMConfirm = (confirm: boolean, issueId: number) => {
        if(confirm) {
            const issueIndex = filteredIssueList.findIndex(
                (issue) => issue.issueId === issueId
            );
            if(issueIndex !== -1) {
                const updatedIssueList = [...filteredIssueList];
                updatedIssueList[issueIndex].edit = "N";
                setFilteredIssueList(updatedIssueList);
            }
        }
    }

    return (
        <Droppable droppableId={type} key={type}>
            {(provided) => (
                <S.Wrapper ref={provided.innerRef} {...provided.droppableProps} style={{backgroundColor}}>
                    <S.InnerWrapper>
                        {filteredIssueList &&
                        filteredIssueList.map((issue: any, index: number) => (
                            <Draggable key={issue.issueId} draggableId={issue.issueId.toString()} index={index}>
                                {(provided) => (
                                
                        <S.TestIssueWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                            <Router>
                                <IssuePreview
                                    key={issue.issueId}
                                    issueList={issue}
                                    type="Issue"
                                    onDelete={handleDeleteIssue}
                                    index={index}
                                    onEdit={handleEditIssue}
                                    onPMConfirm={handlePMConfirm}
                                />
                            </Router>
                        </S.TestIssueWrapper>
                        )}
                        </Draggable>
                        ))}
                    </S.InnerWrapper>
                </S.Wrapper>
            )}
        </Droppable>
    );
}
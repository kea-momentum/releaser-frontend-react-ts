import React, {useState} from "react";
import * as S from "./IssueBoardSection.styled";
import { IssueData } from "@/types/issue";
import IssuePreview from "../IssuePreview";
import { Droppable } from "react-beautiful-dnd";

interface IssueBoardSectionProps {
    type: string;
    issueList?: IssueData[];
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
    const filteredIssueList = issueList?.filter(
        (issue) => !deletedIssues.includes(issue.issueId)
    );

    return (
        <S.Wrapper style={{backgroundColor}}>
            <S.InnerWrapper>
                {filteredIssueList &&
                filteredIssueList.map((issue: any, index: number) => (
                <S.TestIssueWrapper>
                    <IssuePreview
                        key={issue.issueId}
                        issueList={issue}
                        type="Issue"
                        onDelete={handleDeleteIssue}
                        index={index}
                    />
                </S.TestIssueWrapper>
                ))}
            </S.InnerWrapper>
        </S.Wrapper>
    );
}
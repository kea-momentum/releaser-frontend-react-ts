import React, {useState} from "react";
import * as S from "./IssueBoardSection.styled";
import { IssueData } from "@/types/issue";
import IssuePreview from "../IssuePreview";

interface IssueBoardSectionProps {
    type: string;
    issueList?: IssueData[];
}

export default function IssueBoardSection({type, issueList}: IssueBoardSectionProps) {
    let backgroundColor = "#81A0D3";
    if(type === "InProgress") {
        backgroundColor = "#FF6262";
    } else if(type === "NotStarted") {
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
                filteredIssueList.map((issue: any) => (
                <S.TestIssueWrapper>
                    <IssuePreview
                        key={issue.issueId}
                        issueList={issue}
                        type="Issue"
                        onDelete={handleDeleteIssue}
                    />
                </S.TestIssueWrapper>
                ))}
            </S.InnerWrapper>
        </S.Wrapper>
    );
}
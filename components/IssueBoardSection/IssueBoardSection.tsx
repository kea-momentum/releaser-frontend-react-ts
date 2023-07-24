import React from "react";
import * as S from "./IssueBoardSection.styled";

interface IssueData {
    content: string;
    deployYN: string;
    edit: string;
    issueId: number;
    issueNum: number;
    lifeCycle: string;
    memberId: number;
    memberImg: string;
    memberName: string;
    releaseVersion: string;
    tag: string;
    title: string;
}

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

    return (
        <S.Wrapper style={{backgroundColor}}>
            {issueList?.map((issue) => (
                <S.TestIssueWrapper key={issue.issueId}>{issue.title}</S.TestIssueWrapper>
            ))}
        </S.Wrapper>
    );
}
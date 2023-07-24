import React from "react";
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

    return (
        <S.Wrapper style={{backgroundColor}}>
            {issueList &&
            issueList.map((issue: any) => (
              <IssuePreview
                key={issue.issueId}
                issueList={issue}
                type="Release"
              />
            ))}
            {/* {issueList?.map((issue) => (
                <S.TestIssueWrapper key={issue.issueId}>{issue.title}</S.TestIssueWrapper>
            ))} */}
        </S.Wrapper>
    );
}
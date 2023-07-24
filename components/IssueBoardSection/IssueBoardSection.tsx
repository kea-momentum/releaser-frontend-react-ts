import React from "react";
import * as S from "./IssueBoardSection.styled";

interface IssueBoardSectionProps {
    type: string;
}

export default function IssueBoardSection({type}: IssueBoardSectionProps) {
    let backgroundColor = "#81A0D3";
    if(type === "InProgress") {
        backgroundColor = "#FF6262";
    } else if(type === "NotStarted") {
        backgroundColor = "#FFCE70";
    }

    return (
        <S.Wrapper style={{backgroundColor}}>
            {/* map으로 각 Issue들을 매핑해야 해 */}
            <S.TestIssueWrapper>
                Hello
            </S.TestIssueWrapper>
            <S.TestIssueWrapper>
                World
            </S.TestIssueWrapper>
            <S.TestIssueWrapper>
                Releaser
            </S.TestIssueWrapper>
            <S.TestIssueWrapper>
                Momentum
            </S.TestIssueWrapper>
            <S.TestIssueWrapper>
                TEST
            </S.TestIssueWrapper>
            <S.TestIssueWrapper>
                TESTTEST
            </S.TestIssueWrapper>
        </S.Wrapper>
    );
}
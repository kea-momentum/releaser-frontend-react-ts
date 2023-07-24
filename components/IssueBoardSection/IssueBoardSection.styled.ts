import styled from "styled-components";

export const Wrapper = styled.div`
    width: 28vw;
    height: 67vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    overflow-y: auto;

    // 스크롤 사라지게
    /* &::-webkit-scrollbar {
        width: 0px;
    } */

    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const TestIssueWrapper = styled.div`
    background-color: #fff;
    width: 24vw;
    height: 12vh;

    flex-shrink: 0;

    margin-top: 2vh;
    &:last-child {
        margin-bottom: 2vh;
    }
    padding: 6px;

    border-radius: 11px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
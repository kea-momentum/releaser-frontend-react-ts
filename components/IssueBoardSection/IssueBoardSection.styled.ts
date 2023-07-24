import styled from "styled-components";

export const Wrapper = styled.div`
    width: 28vw;
    height: 67vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const InnerWrapper = styled.div`
    width: 100%;
    height: 99%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    margin-top: 1%;

    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0px;
    }

    /* background-color: blue; */
`;

export const TestIssueWrapper = styled.div`
    background-color: #fff;
    /* width: 24vw;
    height: 12vh; */

    flex-shrink: 0;

    margin-top: 2vh;
    &:last-child {
        margin-bottom: 2vh;
    }
    padding: 6px;

    border-radius: 11px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
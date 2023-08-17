import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 15px;
    background: rgba(235, 235, 235, 0.50);

    display: flex;
    flex-direction: row;
`;

export const ContentSection = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: row;

    border-right: solid 0.3px #555;

    cursor: default;
`;

export const ImageContent = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 2px;
`;

export const MessageContent = styled.div`
    width: 75%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ImgWrapper = styled.div`
    width: 55px;
    height: 55px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    border-radius: 50%;
    border: 0.6px solid #000;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ProjectInfo = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
`;

export const NotificationInfo = styled.div`
    margin-top: 5px;
    margin-right: 7px;

    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;
`;

export const ButtonSection = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    flex-direction: column;

    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.32px;

    cursor: pointer;
`;

export const MoreButton = styled.div`
    width: 100%;
    height: 50%;

    border-bottom: solid 0.3px #555;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CancelButton = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
`;
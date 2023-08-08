import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 80px;

    display: flex;
    flex-direction: row;

    border-bottom: 1px solid #666;
`;

export const LogoSection = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    /* background-color: blue; */
`;

export const MainInfoSection = styled.div`
    width: 60%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const RightInfoSection = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
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

    margin-left: 18px;

    background-color: grey;
`;

export const ProjectInfo = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;

    margin-top: 2px;
    margin-left: 10px;
    margin-bottom: 8px;
`;

export const NotificationInfo = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;

    margin-left: 10px;
`;

export const NotificationType = styled.div`
    width: 90px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.2px;

    border-radius: 10px;
    background: #ED726F;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;

    margin-top: 2px;
    margin-bottom: 10px;
    margin-right: 20px;
`;

export const DateInfo = styled.div`
    color: #000;
    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-right: 24px;
    margin-bottom: 6px;
`;
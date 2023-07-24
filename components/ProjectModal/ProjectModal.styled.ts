import styled from "styled-components";

export const Wrapper = styled.div`
    width: 40vw;
    height: 46vh;

    /* border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */

    display: flex;
    flex-direction: column;
`;

export const ModalTitle = styled.div`
    margin-top: 14px;
    margin-left: 25px;

    color: #000;
    font-size: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.34px;
`;

export const ModalContent = styled.div`
    height: 100%;

    margin-top: 10px;
    margin-bottom: 6px;

    display: flex;
    flex-direction: row;
`;

export const LeftSection = styled.div`
    width: 30%;

    justify-content: center;
    align-items: center;

    display: flex;
    flex-direction: column;
`;

export const RightSection = styled.div`
    width: 70%;

    margin-left: 10px;
    justify-content: center;

    display: flex;
    flex-direction: column;
`;

export const ImgContent = styled.div`
    width: 120px;
    height: 120px;
    
    margin-bottom: 16px;

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

export const ImgButtonWrapper = styled.div`
    width: 8vw;
    height: 4vh;

    display: flex;
    flex-direction: row;

    border-radius: 16px;
    border: 0.5px solid #F1F1F1;
    background: #FFF;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const ImgButtonSection = styled.div`
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

export const VerticalLine = styled.div`
    width: 0.8px;
    height: 100%;
    background-color: #D1D0D0;
`;

export const ImgUpload = styled.div`
    color: #3A3A3A;
    text-align: center;
    font-size: 13px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;

    background-color: #D6C7ED;
`;

export const InputTitle = styled.div`
    color: #000;
    font-size: 14px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.26px;

    margin-bottom: 6px;
    padding-left: 2px;
`;

export const InputField = styled.input`
    width: 24vw;
    height: 3vh;

    padding: 5px;
    /* margin-bottom: 20px; */
    margin-bottom: 4px;

    border: 0;
    border-radius: 5px;
    background: #F1F1F1;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;

    font-size: 13px;
`;

export const InputAlert = styled.div`
    margin-bottom: 16px;
    margin-left: 2px;

    color: #DA2121;
    font-family: Inter;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.2px;
`;

export const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
    margin-bottom: 18px;
    margin-left: 66%;
`;

export const BtnContent = styled.div`
    width: 4vw;
    height: 3.2vh;

    margin-right: 12px;

    background-color: #615E58;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    color: #FFF;
    text-align: center;
    font-size: 13px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.8px;
    cursor: pointer;
`;
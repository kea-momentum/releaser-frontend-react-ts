import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    background-color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const TitleSection = styled.div`
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContentSection = styled.div`
    width: 100%;
    height: 82%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContentWrapper = styled.div`
    width: 95%;
    height: 98%;

    border-radius: 10px;
    border: 1px solid #E1E1E1;

    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 0px;
    }
`;

export const ButtonSection = styled.div`
    width: 100%;
    height: 8%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    /* background-color: green; */
`;

export const TopContent = styled.div`
    width: 100%;
    height: 10%;

    display: flex;
    flex-direction: row;

    margin-top: 4px;
    padding-bottom: 6px;

    /* background-color: red; */
`;

export const MiddleContent = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;

    padding-bottom: 10px;

    /* background-color: blue; */
`;

export const BottomContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* background-color: green; */
`;

export const TopLeft = styled.div`
    width: 75%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding-left: 14px;

    color: #808080;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
`;

export const TopRight = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    /* background-color: purple; */
`;

export const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;

    cursor: pointer;
`;

export const TagListTitle = styled.div`
    width: 120px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 11px;
    background: #F9F9F9;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;

    margin-left: 10px;
    margin-right: 20px;
`;

export const TagListWrapper = styled.div`
    width: 130px;
    height: 190px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 11px;
    background: #F0F0F0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const TagContainer = styled.div`
    width: 120px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 11px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    
    margin-bottom: 3px;
    margin-top: 3px;

    color: #FFF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;

    cursor: pointer;
`;

export const EndDateWrapper = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
`;

export const EditYNWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 4px;
    margin-right: 16px; 

    color: #6B6B6B;
    text-align: center;
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.16px;
`;

export const EditIconButton = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 50%;

    margin-bottom: 4px;
`;

export const DescriptionWrapper = styled.div`
    width: 75%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const PersonDesWrapper = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    flex-direction: column;

    /* background-color: green; */
`;

export const SearchPersonSection = styled.div`
    width: 94%;
    height: 5%;

    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 8px;
    margin-bottom: 12px;
`;

export const PersonListSection = styled.div`
    width: 94%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 4px;
    background: rgba(129, 160, 211, 0.30);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;

    overflow-y: scroll;
`;

export const PersonItem = styled.div`
    width: 150px;
    height: 24px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    border-radius: 5px;
    background: #FFF;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);

    margin-bottom: 5px;
    padding-left: 10px;
    &:first-child {
        margin-top: 10px;
    }

    color: #393939;
    font-family: Pretendard;
    font-size: 7px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.14px;

    cursor: pointer;
`;

export const ProfileContainer = styled.div`
    width: 14px;
    height: 14px;

    border-radius: 50%;

    margin-right: 6px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const SearchPersonTitle = styled.div`
    padding-left: 2px;
    padding-right: 8px;

    color: #333;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.22px;
`;

export const SearchContainer = styled.div`
    width: 122px;
    height: 20px;

    display: flex;
    align-items: center;

    padding: 3px;

    border-radius: 3px;
    background: #FFF;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const SearchInput = styled.input`
    width: 97px;
    height: 16px;

    border: none;
    outline: none;

    margin-left: 4px;
    margin-right: 4px;

    background: none;

    color: #808080;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.22px;
`;

export const OpinionTitle = styled.div`
  font-weight: 500;

  width: 100%;
  height: 28px;

  display: flex;
  align-items: center;
  margin-left: 30px;
`;

export const ButtonWrapper = styled.div`
    width: 160px;
    height: 50px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin-right: 20px;
    margin-bottom: 5px;
`;
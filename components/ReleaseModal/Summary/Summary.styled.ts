import styled from "styled-components";

export const CenterSection = styled.section`
  width: 720px;
  height: 900px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 14px;
  margin-bottom: 14px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const SummaryInput = styled.input`
  font-size: 12px;

  width: 703px;
  height: 32px;

  border: 3px solid #dfdfdf;
  outline: none;
  padding-left: 10px;
  margin: 0;
  font: inherit;
  appearance: none;
  color: #2d2d2d;
`;

export const Header = styled.div`
  font-weight: 500;

  width: 100%;
  height: 28px;

  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
`;

export const PreviewButton = styled.div`
  font-size: 11px;

  width: 50px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 7px;
  margin-left: 10px;
  margin-bottom: 3px;
  background-color: #ed726f;
  color: white;

  cursor: pointer;
`;

export const ContentArea = styled.textarea`
  font-size: 14px;

  width: 693px;
  height: 430px;

  padding: 10px;
  border: 4px solid #dfdfdf;
  outline: none;
  appearance: none;
  resize: none;
  color: #2d2d2d;
`;

export const ContentAreaPreview = styled.div`
  font-size: 14px;

  width: 693px;
  height: 430px;

  padding: 10px;
  border: 4px solid #dfdfdf;
  color: #2d2d2d;
  overflow-y: scroll;
`;

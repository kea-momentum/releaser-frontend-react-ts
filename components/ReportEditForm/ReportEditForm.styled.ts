import { S } from "msw/lib/glossary-de6278a9";
import styled from "styled-components";

type TagColorType = {
  color: string;
};

type HeightType = {
  heightValue: string;
};

export const VersionHeader = styled.div`
  font-size: 40px;
  font-style: normal;
  font-weight: 400;

  min-width: 130px;
  height: 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-right: 20px;
  color: #4d4d4d;
`;

export const TitleHeader = styled.div`
  font-size: 30px;
  font-weight: 400;

  width: 80%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  margin-top: 40px;
`;

export const IssueContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

export const IssueSubContainer = styled.div`
  width: 100%;
  min-height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const TagContainer = styled.div`
  font-size: 15px;

  width: 115px;
  height: 25px;
  margin-top: 20px;
`;

export const IssueContent = styled.div`
  width: 100%;
  min-height: 70px;

  margin-top: 10px;
  margin-left: 10px;
`;

export const IssueTitle = styled.div`
  width: 100%;
  min-height: 50px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const IssueTitleText = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-left: 20px;

  &:hover {
    background: #e2e8f0;
  }
`;

export const IssueNumber = styled.div<TagColorType>`
  font-size: 20px;
  font-weight: 700;
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  /* background: ${props => props.color}; */
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset; */
  color: ${props => props.color};
`;

export const InputContainer = styled.div<HeightType>`
  width: 98%;
  min-height: ${props => props.heightValue};
  display: flex;
  justify-content: center;

  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  position: relative;

  background-color: #e2e8f0;
`;

export const SummaryContainer = styled.div`
  width: 98%;
  min-height: 20px;
  display: flex;
  justify-content: center;

  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  position: relative;

  background-color: #e2e8f0;
`;

export const SummaryText = styled.div`
  font: inherit;
  width: 92.5%;

  resize: none;
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  background-color: transparent;

  line-height: 1.6;
`;

export const UploadButton = styled.div<TagColorType>`
  width: 40px;
  height: 40px;

  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 100%;
  left: 96%;
  transform: translateX(-0%);

  margin-top: -30px;
  position: absolute;
  background: #dfdfdf;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  cursor: pointer;

  &:hover {
    background: ${props => props.color};
  }
`;
export const InputSpace = styled.textarea`
  font: inherit;

  width: 92.5%;

  resize: none;
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  background-color: transparent;

  line-height: 1.6;
`;

export const MarkDownContainer = styled.div`
  font-size: 19px;
  width: 80%;
  margin-top: 40px;
  margin-bottom: 20px;
`;

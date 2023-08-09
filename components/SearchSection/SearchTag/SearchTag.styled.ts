import styled from "styled-components";

type WidthType = {
  width: string;
};

type TagColorType = {
  color: string;
};

export const SerachTagContainer = styled.div<TagColorType>`
  color: white;
  max-width: 150px;
  height: 70%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 100px;
  background: ${props => props.color};
  margin-right: 10px;
`;

export const IconContainer = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-right: 10px;
  margin-left: 5px;
  color: white;

  cursor: pointer;
`;

export const TextContainer = styled.div`
  width: 80%;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListSearchTagContainer = styled.div<TagColorType>`
  color: white;

  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100px;
  padding-left: 10px;
  padding-right: 10px;
  background: ${props => props.color};
`;

export const ListTextContainer = styled.div`
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

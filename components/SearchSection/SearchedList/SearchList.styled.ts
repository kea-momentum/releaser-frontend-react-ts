import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

type ListTypeColor = {
  color: string;
};

export const ListContainer = styled.div`
  width: 99%;
  height: 50px;

  display: flex;
  justify-content: space-between;

  background: white;

  margin-bottom: 10px;
  border: 1px solid black;
`;

export const ListLeftContainer = styled.div`
  display: flex;
  justify-content: start;
`;

export const ReleaseModal = styled(Modal)`
  width: 1123px;
  height: 684px;

  position: absolute;
  padding-bottom: 10px;
  padding-top: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  outline: none !important;
`;

export const ListType = styled.div<ListTypeColor>`
  width: 100px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.color};
  color: white;
  margin-right: 10px;
`;

export const TitleContainer = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const TagsSection = styled.div`
  width: fit-content;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: center;
`;

export const TagContainer = styled.div`
  margin-right: 10px;
`;

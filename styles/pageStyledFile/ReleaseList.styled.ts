import styled from "styled-components";
import Modal from "react-modal";

export const MainContainer = styled.div`
  width: 100vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OuterSection = styled.section`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hide;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  width: 1200px;
  height: 700px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  border-bottom: 1px solid black;
  background: #f8f8f8;
`;

export const SearchColumnTitle = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  background: #eee;
`;

export const SearchColumn = styled.div`
  width: 100%;

  display: flex;

  border-bottom: 1px solid black;
  &:hover {
    background: rgba(129, 160, 211, 0.3);
  }
  cursor: pointer;
`;

export const VersionColumn = styled.div`
  width: 15%;
  height: 100%;
  min-height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleColumn = styled.div`
  width: 45%;
  min-height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DescriptionColumn = styled.div`
  width: 40%;
  height: 100%;
  min-height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReleaseContentList = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
`;

export const TagContainer = styled.div`
  font-size: 8px;
  width: 100px;
  height: 20px;

  margin-right: 10px;
`;

export const TagListContainer = styled.div`
  width: 100%;
  min-height: 50px;
  margin-top: 10px;

  display: flex;
`;

export const IssueTitleContainer = styled.div`
  width: 100%;
  min-height: 50px;
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

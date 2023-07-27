import styled from "styled-components";
import Add from "@/public/images/Add.svg";

export const CommentSection = styled.section`
  width: 720px;

  display: flex;
  justify-content: center;
  border-radius: 10px;
  background: rgba(251, 202, 107, 0.7);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const CommentInnerSection = styled.section`
  width: 720px;

  margin-top: 4px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 5px;
  border-radius: 10px;

  &:last-child {
    margin-bottom: 12px;
  }
`;

export const CommentBox = styled.section`
  width: 690px;
  height: auto;

  padding-bottom: 4px;
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border-radius: 5px;
  margin-top: 10px;
  background-color: white;
`;

export const CommentTitle = styled.div`
  width: 630px;
  height: auto;

  display: flex;
  align-items: center;

  margin-left: 5px;
`;

export const AddComment = styled.div`
  width: 690px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
  margin-top: 10px;
  background-color: white;
`;

export const CommentInput = styled.input`
  width: 91%;
  height: 100%;

  border: none;
  outline: none;
  padding-left: 5px;
  margin: 0;
  font: inherit;
  appearance: none;
`;

export const AddButton = styled(Add)`
  margin-left: 10px;
  margin-right: 10px;
`;

export const ProfileContainer = styled.div`
  margin-left: 10px;
  margin-right: -4px;
`;

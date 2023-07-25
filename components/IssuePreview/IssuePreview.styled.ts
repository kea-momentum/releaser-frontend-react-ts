import styled from "styled-components";

export const IssuePreviewBox = styled.div`
  width: 303px;
  height: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 11px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-top: 13px;
`;

export const TopContainer = styled.div`
  width: 90%;
  height: 30%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 7px;
`;

export const Title = styled.div`
  color: #393939;
  font-size: 14px;

  width: 200px;
  height: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResolvedToggle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 12px;
  background: #bf3b3b;
`;

export const BottomContainer = styled.div`
  width: 90%;
  height: 30%;

  display: flex;
  align-items: end;
  justify-content: space-between;

  margin-bottom: 8px;
`;

export const ProfileContainer = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 18px;
  background: #ffce70;
`;

export const ButtonContainer = styled.div`
  width: 60px;
  height: 100%;

  display: flex;
  justify-content: end;
`;

export const Button = styled.div`
  font-size: 12px;
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: end;
`;

export const TagBox = styled.div`
  width: 80px;
  height: 100%;
`;

export const DateBox = styled.div`
  font-size: 7px;
  font-weight: 700;

  width: 60px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10%;
  background: #e9e9e9;
  margin-left: 5px;
`;

export const BottomLeftContainer = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
`;

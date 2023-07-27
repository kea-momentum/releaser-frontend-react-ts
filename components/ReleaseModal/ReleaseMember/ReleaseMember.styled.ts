import styled from "styled-components";
import Image from "next/image";
export const MemberContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const TopContainer = styled.div`
  width: 95%;
  height: 30px;

  display: flex;
  align-items: end;
  margin-bottom: 4px;
  margin-top: 20px;
`;

export const Header = styled.div`
  font-size: 15px;
  font-weight: 500;

  margin-right: 10px;
`;

export const VotedStatus = styled.div`
  width: 60px;
  height: 18px;

  border-radius: 7px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const BottomContainer = styled.div`
  width: 95%;

  display: flex;
  align-items: top;

  margin-top: 3px;
  padding-bottom: 60px;

  padding-left: 10px;
  padding-right: 20px;

  margin-left: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

export const NotParticipateProfile = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 45px;
  filter: brightness(0.6);

  margin-right: 8px;
  border: 3px solid black;
`;

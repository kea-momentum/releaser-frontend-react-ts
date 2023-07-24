import styled from "styled-components";

export const NavBarContainer = styled.div`
  width: 100vw;
  height: 6vh;

  display: flex;
  justify-content: space-between;
  background-color: #eeeeee;
`;

export const LogoContainer = styled.div`
  width: 160px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;
  cursor: pointer;
`;

export const LogoText = styled.div`
  font-size: 23px;
  font-weight: 700;

  margin-top: 8px;
  margin-right: 8px;
  color: #434343;
`;

export const LinkButtonContainer = styled.div`
  width: 300px;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ProfileImgContainer = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background-color: #b8b8b8;
  margin-right: 15px;
`;

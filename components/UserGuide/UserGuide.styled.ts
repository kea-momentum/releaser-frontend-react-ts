import styled from "styled-components";
import XIcon from "@/public/images/XIcon.svg";
import VersionGuide from "@/public/images/VersionGuide.svg";

export const XIonStyled = styled(XIcon)`
  width: 25px;
  height: 25px;
`;
export const MainContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  font-size: 14px;

  width: 100%;
  height: 12%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid black;
`;

export const ImageContainer = styled.div`
  width: 80%;
  height: 60%;
  margin-top: 10px;
`;

export const VersionGuideStyled = styled(VersionGuide)`
  width: 70%;
  height: 50%;
`;

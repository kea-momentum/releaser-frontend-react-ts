import styled from "styled-components";

export const VersionContainer = styled.div`
  width: 190px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  width: 589px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-right: 15px;
`;

export const TitleInput = styled.input`
  width: 552px;
  height: 39px;

  border-radius: 3px;
  background: rgba(200, 199, 199, 0.2);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  border: none;
  outline: none;
  padding-left: 20px;

  font: inherit;
  appearance: none;
`;

export const IssueTitleInput = styled.input`
  width: 94%;
  height: 58%;

  border-radius: 3px;
  background: rgba(200, 199, 199, 0.2);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  border: none;
  outline: none;
  padding-left: 12px;
  margin-top: 8px;

  font: inherit;
  appearance: none;
`;

export const VLogoContainer = styled.div`
  width: fit-content;
  height: 80%;

  display: flex;
  align-items: end;
  margin-right: 4px;
`;
export const VLogo = styled.div`
  color: #989898;
  font-size: 30px;
  font-weight: 500;
`;
export const DotContainer = styled.div`
  width: 12px;
  height: 65%;

  display: flex;
  justify-content: center;
  align-items: end;
`;

export const Dot = styled.div`
  width: 5px;
  height: 5px;

  border-radius: 5px;
  background: #989898;
`;

export const VersionInput = styled.input`
  font-size: 40px;

  width: 25px; /* Adjust the width to your desired size for a single character */
  height: 40px; /* Adjust the height to your desired size for a single character */

  padding: 0;
  border: none;
  outline: none;
  margin: 0;

  margin-bottom: 3px;
  box-shadow: none;
  text-align: center;
  color: #989898;
  font-weight: 500;
`;

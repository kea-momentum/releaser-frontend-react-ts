import styled from "styled-components";

export const VersionContainer = styled.div`
  width: 100;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
  margin-right: 5px;
`;

export const VLogoContainer = styled.div`
  width: fit-content;
  height: 80%;

  margin-bottom: 8px;
  display: flex;
  align-items: end;
  margin-right: 10px;
  margin-left: 5px;
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

  width: 110px;
  height: 40px;
  padding: 0;

  margin-top: 3px;
  box-shadow: none;

  color: #989898;
  font-weight: 500;
  border: none;
  outline: none;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

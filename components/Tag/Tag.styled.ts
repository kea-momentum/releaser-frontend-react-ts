import styled from "styled-components";
type TagColorType = {
  color: string;
};

export const TagContainer = styled.div<TagColorType>`
  color: white;
  font-size: inherit;
  font-weight: 600;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 11px;
  background: ${props => props.color};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

import styled from "styled-components";
import Toggle from "@/public/images/Toggle.svg";

export const DropdownContainer = styled.div`
  color: #8a8a8a;
  font-weight: 600;
  font-size: 16px;

  width: 140px;
  height: 40px;

  display: flex;
  justify-content: end;
  align-items: center;

  border-radius: 3px;
  background: #fefefe;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const ToggleStyle = styled(Toggle)`
  margin-right: 10px;
  margin-left: 17px;
`;

export const DropDownUI = styled.div`
  font-size: 13px;
  font-weight: 400;

  width: 98%;
  height: 90px;

  display: flex;
  flex-direction: column;

  top: 105%;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  background: #fefefe;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 6;
  position: absolute;
  text-align: center;
`;

export const DropDownList = styled.div`
  font-weight: 600;
  font-size: 16px;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-top: 2px solid rgba(181, 175, 175, 0.3);
`;

import styled from "styled-components";
import Toggle from "@/public/images/Toggle.svg";

export const DropdownContainer = styled.div`
  font-size: 16px;

  width: 138px;
  height: 52px;

  display: flex;
  justify-content: end;
  align-items: center;

  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);

  color: #969696;
  margin-right: 15px;
  position: relative;
`;

export const ToggleStyle = styled(Toggle)`
  margin-right: 20px;
  margin-left: 20px;
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

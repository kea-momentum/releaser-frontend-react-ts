import styled, { keyframes } from "styled-components";
import DatePicker from "antd/lib/date-picker";

type HeightType = {
  height: string;
};

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(+30px); /* 위에서 아래로 움직이는 애니메이션 */
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const MainContainer = styled.div`
  width: 95%;
  height: 99%;

  display: flex;
  justify-content: center;
`;

export const SearchSection = styled.div`
  width: 98%;
  height: 10%;

  display: flex;
  align-items: center;
`;

export const TagBox = styled.div`
  font-size: 16px;

  width: 138px;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);

  color: #969696;
  margin-right: 15px;
`;

export const SearchInputBox = styled.div<HeightType>`
  font-size: 12px;

  width: ${props => props.height};
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: start;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  animation: ${fadeInAnimation} 1s ease-in-out;
`;

export const TagSection = styled.div`
  width: 19%;
  height: 60%;
  margin-left: 5px;
  margin-right: 5px;

  cursor: pointer;

  :hover {
    background: #f0f0f0;
    color: #7d7d7d;
  }
`;

export const VersionContainer = styled.div`
  font-size: 20px;

  width: 40%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #969696;
`;

export const SlashBox = styled.div`
  font-size: 10px;

  width: 15px;
  height: 3px;

  border-radius: 10px;
  background: black;

  background: #969696;
`;

export const RangePicker = styled(DatePicker.RangePicker)`
  border: 0px;
  width: 100%;
  height: 100%;
  :focus {
    border: none;
  }
`;

export const TextInput = styled.input`
  font-size: 16px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  border: none;
  outline: none;
  margin: 0;
  box-shadow: none;
  appearance: none;
  background-color: transparent;
`;

export const SearchIconBox = styled.div`
  margin-right: 10px;
`;

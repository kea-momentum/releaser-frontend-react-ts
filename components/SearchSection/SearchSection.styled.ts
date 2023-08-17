import styled, { keyframes } from "styled-components";
import DatePicker from "antd/lib/date-picker";

type HeightType = {
  height: string;
};

type BoxCntType = {
  boxCnt: number;
};

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(+30px); 
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
  flex-direction: column;
  align-items: center;
`;

export const SearchSection = styled.div`
  width: 98%;
  height: 10%;

  display: flex;
  align-items: center;
`;

export const SelectedTagSection = styled.div`
  width: 98%;
  height: 5%;

  display: flex;
  justify-content: start;
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

export const MembersContainer = styled.div<BoxCntType>`
  font-size: 12px;

  width: 200px;
  height: 80px;

  background: #fff;

  margin-left: 10px;

  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  animation: ${fadeInAnimation} 1s ease-in-out;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const MemberBox = styled.div`
  font-size: 16px;

  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 5px;

  color: #969696;
`;

export const VersionInput = styled.input`
  font-size: 20px;

  width: 30%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  background-color: transparent;
  margin-bottom: 1px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
  }
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #e2e8f0 inset;
    box-shadow: 0 0 0 1000px #e2e8f0 inset;
  }
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

export const DropdownContainer = styled.div`
  font-size: 16px;

  width: 110px;
  height: 40px;

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

export const DropDownUI = styled.div<HeightType>`
  font-size: 13px;
  font-weight: 400;

  width: 98%;
  height: ${props => props.height};

  display: flex;
  flex-direction: column;

  top: 105%;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  background: #fefefe;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 6;
  position: absolute;
  text-align: center;
`;

export const DropDownList = styled.div`
  font-size: 16px;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-top: 2px solid rgba(181, 175, 175, 0.3);
`;

export const SearchedListContainer = styled.div`
  width: 98%;
  height: 580px;

  overflow-y: scroll;
  margin-left: 5px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

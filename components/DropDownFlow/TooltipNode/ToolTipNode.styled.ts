import styled from "styled-components";
import TriangleNode from "@/public/images/TriangleNode.svg";
import SquareNode from "@/public/images/SquareNode.svg";
import CircleNode from "@/public/images/CircleNode.svg";
import { Handle } from "reactflow";
export const NodeStyled = styled.div`
  height: 180px;
  width: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HandleStyledLR = styled(Handle)`
  width: 180px;
  height: 200px;

  background: transparent;
  border: 0px;

  border-radius: 30%;
`;

export const HandleStyledTB = styled(Handle)`
  width: 170px;
  height: 240px;

  background: transparent;
  border: 0px;

  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 30%;
`;

export const NodeContainer = styled.div`
  width: 150px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PatchNode = styled(TriangleNode)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 3;
`;

export const MinorNode = styled(SquareNode)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 3;
`;

export const MajorNode = styled(CircleNode)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 3;
`;

export const ReleaseTitle = styled.div`
  font-size: 26px;
  font-weight: 700;

  width: 200px;

  text-align: center;
  color: white;
  position: absolute;
  margin-bottom: 10px;
  z-index: 3;
`;

export const Tooltip = styled.div`
  width: 200px;
  background-color: #eef3ff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
`;

export const TooltipTitle = styled.div`
  width: 200px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
`;

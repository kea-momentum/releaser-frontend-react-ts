import styled from "styled-components";
import CircleNode from "@/public/images/CircleNode.svg";
import { Panel } from "reactflow";

export const ReactFlowDiv = styled.div`
  width: 100vw;
  height: 100%;

  display: flex;
  justify-content: start;
`;
export const MajorNode = styled(CircleNode)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
  border-radius: 300px;

  position: absolute;
  z-index: 3;
`;

export const DownloadImgButton = styled.div`
  width: 100px;
  height: 50px;
  background: red;
  top: 6vh;
`;

export const PanelStyle = styled(Panel)`
  margin-top: 6vh;
`;

export const ProjectInfo = styled.div`
  width: 300px;
  height: 100px;

  background: grey;
`;

import React, { useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import ToolTipNode from "./TooltipNode";
import * as S from "./DropDownFlow.styled";
import * as api from "@/api";
import { Alert } from "@/util";
import CustomEdge from "./\bButtonEdge";
import {
  nodes as recoilNodes,
  edges as recoilEdges,
  releaseType,
  projectId,
} from "@/storage/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { USER_TYPE, RELEASE_TYPE, RELEASE_MESSAGE } from "@/constants";

const edgeTypes = {
  buttonedge: CustomEdge,
};

const nodeTypes = {
  tooltip: ToolTipNode,
};

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = ({ user, setPosition }: any) => {
  const reactFlowWrapper = useRef<any>(null);
  const connectingNodeId = useRef<any>(null);
  const currentNodes = useRecoilValue<any>(recoilNodes);
  const currentEdges = useRecoilValue<any>(recoilEdges);
  const handleReleaseType = useSetRecoilState(releaseType);
  const currentProjectId = useRecoilValue(projectId);
  const [nodes, setNodes, onNodesChange] = useNodesState(currentNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentEdges);
  const { project } = useReactFlow();
  const router = useRouter();

  const onOver = () => {
    const newNodes = nodes.map(node => ({
      releaseId: node.data.uid,
      coordX: node.position.x,
      coordY: node.position.y,
    }));

    api.postNewNodePosition({ coordinates: newNodes });
  };

  const onConnect = useCallback(
    (params: any) => setEdges(eds => addEdge(params, eds)),
    [],
  );

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    if (user.position === USER_TYPE.PM) {
      connectingNodeId.current = nodeId;
    }
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (user.position === USER_TYPE.PM) {
        const targetIsPane =
          event.target.classList.contains("react-flow__pane");

        if (targetIsPane) {
          const { top, left } =
            reactFlowWrapper.current.getBoundingClientRect();

          setPosition(
            project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
          );
          handleReleaseType(RELEASE_TYPE.PM_CREATE);
          router.push(`${currentProjectId}/?releaseId=create`);
        }
      } else {
        Alert.error(RELEASE_MESSAGE.MEMBER_CANNOT_CREATE);
      }
    },
    [project],
  );

  return (
    <>
      <S.ReactFlowDiv
        className="wrapper"
        ref={reactFlowWrapper}
        style={{ width: "100vw", height: "94vh" }}
      >
        {/* <DownloadButton /> */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitViewOptions={fitViewOptions}
          onNodeMouseLeave={onOver}
        />
      </S.ReactFlowDiv>
    </>
  );
};

export default ({ user, setPosition, setReleaseType }: any) => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop
      user={user}
      setPosition={setPosition}
      setReleaseType={setReleaseType}
    />
  </ReactFlowProvider>
);

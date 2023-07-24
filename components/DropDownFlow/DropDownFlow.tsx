import React, { useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Position,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import ToolTipNode from "./TooltipNode";
import axios from "axios";
import * as S from "./DropDownFlow.styled";
import DownloadButton from "./Downloadimg";
import * as api from "@/api";
import { Alert } from "@/util/Alert";
import CustomEdge from "./\bButtonEdge";
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

const AddNodeOnEdgeDrop = ({
  user,
  firstNodes,
  firstEdges,
  setPosition,
  setReleaseType,
}: any) => {
  const reactFlowWrapper = useRef<any>(null);
  const connectingNodeId = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(firstNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(firstEdges);
  const { project } = useReactFlow();

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
    if (user.position === "L") {
      connectingNodeId.current = nodeId;
    }
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (user.position === "L") {
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
          setReleaseType("PM_CREATE");
        }
      } else {
        Alert.error("멤버는 릴리즈 노트를 생성할 수 없습니다.");
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

export default ({
  user,
  firstNodes,
  firstEdges,
  setPosition,
  setReleaseType,
}: any) => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop
      user={user}
      firstNodes={firstNodes}
      firstEdges={firstEdges}
      setPosition={setPosition}
      setReleaseType={setReleaseType}
    />
  </ReactFlowProvider>
);

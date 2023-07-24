import { Alert } from "../Alert";
import { checkVersionType } from "../functions/version";
import { label } from "@/components/ReleaseModal/ReleaseModal";
import ReactFlow, { Background, MarkerType } from "reactflow";

export class Flow {
  static setNewNodes(response: any, setNodes: any, setEdges: any) {
    const releases = response?.result.releases;
    const projectId = response?.result.projectId;
    if (releases) {
      const updatedNodes = releases?.map((node: any) => ({
        id: node.version,
        data: {
          label: node.version,
          info: checkVersionType(node.version),
          uid: node.releaseId,
          projectId: projectId,
        },
        type: "tooltip",
        position: { x: node.coordX, y: node.coordY },
      }));

      const updatedEdges = releases?.map((node: any) => ({
        id: node.releaseId,
        source: node.version,
        target: checkVersionType(node.version)?.parent,
        data: {
          label: node.summary,
        },
        style: {
          stroke: "#A09696",
          strokeWidth: 4,
        },
        type: "buttonedge",
      }));

      setEdges(updatedEdges);
      setNodes(updatedNodes);
    }
  }

  static EditNodes(
    projectId: string,
    response: any,
    edges: any,
    nodes: any,
    setNodes: any,
    setEdges: any,
  ) {
    const updatedEdges = edges.map((edge: any) => {
      if (edge.id === response.result.releaseId) {
        return {
          ...edge,
          source: response.result.version,
          target: checkVersionType(response.result.version)?.parent,

          data: {
            label: response.result.summary,
          },
          type: "buttonedge",
        };
      } else {
        return edge;
      }
    });
    const updatedNodes = nodes.map((node: any) => {
      if (node.data.uid === response.result.releaseId) {
        return {
          ...node,
          id: response.result.version,
          data: {
            label: response.result.version,
            info: checkVersionType(response.result.version),
            uid: response.result.releaseId,
            projectId: projectId,
          },
          type: "tooltip",
        };
      } else {
        return node;
      }
    });
    setEdges(updatedEdges);
    setNodes(updatedNodes);
    Alert.success("수정 완료 되었습니다.");
  }

  static addNewNodes(
    response: any,
    setNodes: any,
    setEdges: any,
    edges: any,
    nodes: any,
  ) {
    const result = response.result;
    const updatedNode: any = {
      id: result.version,
      data: {
        label: result.version,
        info: checkVersionType(result.version),
        uid: result.releaseId,
        projectId: result.projectId,
      },
      type: "tooltip",
      position: { x: result.coordX, y: result.coordY },
    };

    const updatedEdge = {
      id: result.version,
      source: result.version,
      target: checkVersionType(result.version)?.parent,
      data: {
        label: result.summary,
      },
      style: {
        stroke: "#A09696",
        strokeWidth: 4,
        type: "straight",
      },
      type: "buttonedge",
    };

    setNodes([...nodes, updatedNode]);
    setEdges([...edges, updatedEdge]);
  }
}

import { Dispatch, SetStateAction } from "react";
import { Alert } from "../Alert";
import { checkVersionType } from "../functions/version";
import { Node, Edge } from "reactflow";
import { ReleaseListGetResponse } from "@/types";

export class Flow {
  static setNewNodes(
    response: ReleaseListGetResponse,
    setNodes: Dispatch<SetStateAction<Node[]>>,
    setEdges: Dispatch<SetStateAction<Edge[]>>,
  ) {
    const releases = response?.releases;
    const projectId = response?.projectId;
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
        animated: node.deployStatus !== "DEPLOYED" ? true : false,
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
    edges: Edge[],
    nodes: Node[],
    setNodes: Dispatch<SetStateAction<Node[]>>,
    setEdges: Dispatch<SetStateAction<Edge[]>>,
  ) {
    const updatedEdges = edges.map((edge: Edge) => {
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

    const updatedNodes = nodes.map((node: Node) => {
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
    setNodes: Dispatch<SetStateAction<Node[]>>,
    setEdges: Dispatch<SetStateAction<Edge[]>>,
    edges: Edge[],
    nodes: Node[],
  ) {
    const result = response.result;
    const updatedNode = {
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

  static deleteNode(
    setNodes: Dispatch<SetStateAction<Node[]>>,
    nodes: Node[],
    targetNodeId: string,
  ) {
    const updatedNodes = nodes.filter((node: any) => node.id !== targetNodeId);
    setNodes(updatedNodes);
  }
}

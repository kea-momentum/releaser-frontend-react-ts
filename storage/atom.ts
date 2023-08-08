import { atom } from "recoil";
import { Node, Edge } from "reactflow";

export let nodes = atom<Node[]>({
  key: "nodes",
  default: [],
});

export let edges = atom<Edge[]>({
  key: "edges",
  default: [],
});

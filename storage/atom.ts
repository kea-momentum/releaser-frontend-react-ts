import { atom } from "recoil";
import { Node, Edge } from "reactflow";
import { UserType } from "@/types";

export let nodes = atom<Node[]>({
  key: "nodes",
  default: [],
});

export let edges = atom<Edge[]>({
  key: "edges",
  default: [],
});

export let releaseType = atom<string>({
  key: "releaseType",
  default: "",
});

export let user = atom<UserType>({
  key: "user",
  default: { position: "", memberId: 0 },
});

export let projectId = atom<string>({
  key: "projectId",
  default: "",
});

export let backLink = atom<string>({
  key: "backLink",
  default: "",
});

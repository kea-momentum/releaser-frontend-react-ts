import { atom } from "recoil";
import { Node, Edge } from "reactflow";
import { UserProfileType, UserType } from "@/types";

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

export let userProfile = atom<UserProfileType>({
  key: "userProfile",
  default: {
    userId: -1,
    name: "",
    image:
      "https://releaserbucket.s3.ap-northeast-2.amazonaws.com/default/momentum.png",
  },
});

export let loginState = atom<boolean>({
  key: "isLogin",
  default: false,
});
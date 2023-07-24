import { checkVersionType } from "@/util/functions/version";

export const initialNodes = [
  {
    id: "1.0.0",
    type: "tooltip",
    data: { label: "V 1.0.0" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2.0.0",
    type: "tooltip",
    data: { label: "V 2.0.0" },
    position: { x: 500, y: 5 },
  },
  {
    id: "3.0.0",
    type: "tooltip",
    data: { label: "V 3.0.0" },
    position: { x: 700, y: 5 },
  },
  {
    id: "2.1.0",
    type: "tooltip",
    data: { label: "V 2.1.0" },
    position: { x: 700, y: 5 },
  },
  {
    id: "2.1.1",
    type: "tooltip",
    data: { label: "V 2.1.1" },
    position: { x: 700, y: 5 },
  },
];

export const releases = [
  {
    releaseId: 1,
    version: "1.0.0",
    summary: "1버전의 요약입니다.",
    deployStatus: "DEPLOYED",
    coordX: 100,
    coordY: 120,
  },

  {
    releaseId: 2,
    version: "2.0.0",
    summary: "2버전의 요약입니다.",
    deployStatus: "DEPLOYED",
    coordX: 500,
    coordY: 120,
  },

  {
    releaseId: 3,
    version: "3.0.0",
    summary: "3버전의 요약입니다.",
    deployStatus: "DEPLOYED",
    coordX: 700,
    coordY: 120,
  },

  {
    releaseId: 4,
    version: "2.1.0",
    summary: "4버전의 요약입니다.",
    deployStatus: "DEPLOYED",
    coordX: 240,
    coordY: -200,
  },
  {
    releaseId: 5,
    version: "2.1.1",
    summary: "1버전의 요약입니다.",
    deployStatus: "PLANNING",
    coordX: 280,
    coordY: -400,
  },
  {
    releaseId: 6,
    version: "4.0.0",
    summary: "1버전의 요약입니다.",
    deployStatus: "PLANNING",
    coordX: 616,
    coordY: 436.796875,
  },
];

export const initalEdges = [
  {
    id: "2.1.0",
    source: "2.1.0",
    target: checkVersionType("2.1.0")?.parent,
    label: "이렇게 변화했어요",
    style: {
      stroke: "#A09696",
      strokeWidth: 4,
    },
    labelStyle: { fontSize: 30 },
  },
];

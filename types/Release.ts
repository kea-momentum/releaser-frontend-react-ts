export type ReleaseType = {
  coordX: number;
  coordY: number;
  deployDate: string;
  deployStatus: string;
  releaseId: number;
  summary: string;
  version: string;
};

export type ToolTipNodeType = {
  data: {
    info: {
      type: string;
      parent: string;
      line: string;
    };
    label: string;
    projectId: number;
    uid: number;
  };
  dragHandle: undefined;
  dragging: boolean;
  id: string;
  isConnectable: boolean;
  selected: boolean;
  sourcePosition: string;
  targetPosition: string;
  type: string;
  xPos: number;
  yPos: number;
  zIndex: number;
};

export type ReleaseListGetResponse = {
  img: string;
  member: {
    memberId: number;
    position: string;
  };
  projectId: number;
  releases: ReleaseType[];
  team: string;
  title: string;
};

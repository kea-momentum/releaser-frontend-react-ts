import { TAG_COLOR } from "@/constants/Tag";
export type IssueData = {
  content: string;
  deployYN: string;
  edit: string;
  endDate: string;
  issueId: number;
  issueNum: number;
  lifeCycle: string;
  memberId: number;
  memberImg: string;
  memberName: string;
  releaseVersion: string;
  tag: keyof typeof TAG_COLOR;
  title: string;
};
export type TagType = {
  tagText: keyof typeof TAG_COLOR;
};

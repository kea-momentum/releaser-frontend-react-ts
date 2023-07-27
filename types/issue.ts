import { TAG_COLOR } from "@/constants/Tag";

export type IssueData = {
  content: string;
  deployYN: string;
  edit: string;
  endDate: string | null;
  issueId: number;
  issueNum: number;
  lifeCycle: string;
  memberId: number | null;
  memberImg: string;
  memberName: string;
  releaseVersion: string;
  tag: keyof typeof TAG_COLOR;
  title: string;
};

export type TagType = "NEW" | "DEPRECATED" | "CHANGED" | "FEATURE" | "FIXED";

import { TAG_COLOR } from "@/constants/Tag";
import { MemberType } from "./Member";

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

export type IssueDataForEdit = {
  issueNum: number;
  title: string;
  content: string;
  tag: string;
  endDate: string;
  edit: string;
  manager: string;
  deployYN: string;
  memberList: MemberType[];
  opinionList: IssueOpinion[];
};

export type IssueOpinion = {
  memberId: number;
  memberName: string;
  memberImg: string;
  opinionId: number;
  opinion: string;
  deleteYN: string;
};
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
  manager: number;
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

// TODO: 아래 상수명으로 모든 파일에서 IssueData를 변경
export type IssuePreviewData = {
  issueId: number;
  issueNum: number;
  title: string;
  content: string;
  endDate: string;
  tag: keyof typeof TAG_COLOR; // FIXME: string ?
  memberId: number;
  memberImg: string;
  memberName: string;
  lifeCycle: string;
  edit: string;
  deployYN: string;
};

export type IssueDetailData = {
  issueId: number;
  issueNum: number;
  title: string;
  content: string;
  endDate: string;
  tag: keyof typeof TAG_COLOR; // FIXME: string ?
  memberList: MemberType[];
  manager: number;
  edit: string;
  deployYN: string;
  opinionList: IssueOpinion[];
};
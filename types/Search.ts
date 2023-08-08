import { TagType } from "./issue";
import { IssueListType } from "./issue";
import { ReleaseListType } from "./Release";

export type SearchType = "WRITER" | "DATE" | "TITLE" | "TAG" | "VERSION";

export type SearchTagType = {
  tagType: SearchType;
  tagValue: string | TagType;
};

export type SearchResponseType = {
  getIssueInfoList: IssueListType[];
  getReleaseInfoList: ReleaseListType[];
};

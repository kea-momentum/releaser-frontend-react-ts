import { TagType } from "./issue";

export type ReleaseReportResponse = ReleaseReport[];

export type ReleaseReport = {
  releaseId: number;
  releaseVersion: string;
  releaseContent: string;
  releaseTitle: string;
  tagsList: TagListType[];
};

export type TagListType = {
  tag: TagType;
  titleList: TitleListType[];
};

export type TitleListType = {
  issueId: number;
  title: string;
  summary: string;
};

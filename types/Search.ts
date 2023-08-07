import { TagType } from "./issue";

export type SearchType = "WRITER" | "DATE" | "TITLE" | "TAG" | "VERSION";

export type SearchTagType = {
  tagType: SearchType;
  tagValue: string | TagType;
};

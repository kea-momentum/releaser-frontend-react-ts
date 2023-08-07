import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SearchTagType } from "@/types";

export const createSearchApi = (type: any, tagList: SearchTagType[]) => {
  let api = "";
  if (type === "release") {
    api = api + "filterType=release";
    tagList.map(tag => {
      if (tag.tagType === "TITLE") {
        api = api + `&releaseTitle=${tag.tagValue}`;
      }
      if (tag.tagType === "VERSION") {
      }
    });
    return api;
  }
  if (type === "issue") {
    api = api + "filterType=issue";
    tagList.map(tag => {
      if (tag.tagType === "DATE") {
      }
      if (tag.tagType === "TAG") {
        api = api + `&tag=${tag.tagValue}`;
      }
      if (tag.tagType === "TITLE") {
        api = api + `&releaseTitle=${tag.tagValue}`;
      }
      if (tag.tagType === "VERSION") {
      }
      if (tag.tagType === "WRITER") {
        api = api + `&managerId=${tag.tagValue}`;
      }
    });
    return api;
  }
};

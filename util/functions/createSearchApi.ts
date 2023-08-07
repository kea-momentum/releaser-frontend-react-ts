import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SearchTagType } from "@/types";
import { formatDate } from "./sliceData";

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
        const splitDate = tag.tagValue.split("~");
        api = api + `&startDate=${formatDate(splitDate[0])?.filterDateTime}`;
        api = api + `&endDate=${formatDate(splitDate[1])?.filterDateTime}`;

        console.log(api);
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

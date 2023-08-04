import { X } from "lucide-react";
import * as S from "./SearchTag.styled";
import { SearchType } from "@/types";
import { useEffect, useState } from "react";
import { TAG_COLOR, SEARCH_TAG_COLOR } from "@/constants/Tag";
import { formatDate } from "@/util/functions/sliceDate";

type DateType = {
  startDate: string | undefined;
  endDate: string | undefined;
};

type SearchTagType = {
  tagType: SearchType;
  tagValue: string;
};

export default function SearchTagList({ tag }: { tag: SearchTagType }) {
  const [date, setDate] = useState<DateType>();

  useEffect(() => {
    if (tag.tagType === "DATE") {
      const splitString = tag.tagValue.split("~");

      if (splitString) {
        setDate({
          startDate: formatDate(splitString[0])?.shortDateTime,
          endDate: formatDate(splitString[1])?.shortDateTime,
        });
      }
    }
  }, [tag]);

  return (
    tag.tagType !== "TAG" && (
      <S.SerachTagContainer color={SEARCH_TAG_COLOR[tag.tagType]}>
        {tag.tagType === "DATE" && (
          <S.TextContainer>
            {date?.startDate} - {date?.endDate}
          </S.TextContainer>
        )}
        {tag.tagType !== "DATE" && (
          <S.TextContainer>{tag.tagValue}</S.TextContainer>
        )}

        <S.IconContainer>X</S.IconContainer>
      </S.SerachTagContainer>
    )
  );
}

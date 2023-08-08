import { X } from "lucide-react";
import * as S from "./SearchTag.styled";
import { MemberType, SearchType } from "@/types";
import { useEffect, useState } from "react";
import { TAG_COLOR, SEARCH_TAG_COLOR } from "@/constants/Tag";
import { formatDate } from "@/util/functions/sliceData";
import { TagType } from "@/types/issue";

type DateType = {
  startDate: string | undefined;
  endDate: string | undefined;
};

type SearchTagType = {
  tagType: SearchType;
  tagValue: string | TagType;
};

export default function SearchTagList({
  tag,
  onDeleteTag,
  memberList,
}: {
  tag: SearchTagType;
  onDeleteTag: any;
  memberList: MemberType[];
}) {
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

  return tag.tagType !== "TAG" ? (
    <S.SerachTagContainer color={SEARCH_TAG_COLOR[tag.tagType]}>
      {tag.tagType === "DATE" && (
        <S.TextContainer>
          {date?.startDate} - {date?.endDate}
        </S.TextContainer>
      )}
      {tag.tagType === "TITLE" ||
        (tag.tagType === "VERSION" && (
          <S.TextContainer>{tag.tagValue}</S.TextContainer>
        ))}
      {tag.tagType === "WRITER" && (
        <S.TextContainer>
          {memberList
            .filter(member => member.memberId === Number(tag.tagValue))
            .map(filteredMember => filteredMember.name)}
        </S.TextContainer>
      )}
      <S.IconContainer onClick={() => onDeleteTag(tag)}>X</S.IconContainer>
    </S.SerachTagContainer>
  ) : (
    <S.SerachTagContainer color={TAG_COLOR[tag.tagValue as TagType]}>
      <S.TextContainer>{tag.tagValue}</S.TextContainer>
      <S.IconContainer onClick={() => onDeleteTag(tag)}>X</S.IconContainer>
    </S.SerachTagContainer>
  );
}

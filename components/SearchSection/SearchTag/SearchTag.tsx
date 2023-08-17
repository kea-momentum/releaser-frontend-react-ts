import * as S from "./SearchTag.styled";
import { MemberType, SearchType } from "@/types";
import { useEffect, useState } from "react";
import { TAG_COLOR, SEARCH_TAG_COLOR, SEARCH_TAG, SYMBOL } from "@/constants";
import { formatDate } from "@/util";
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
    if (tag.tagType === SEARCH_TAG.DATE) {
      const splitString = tag.tagValue.split(SYMBOL.DATE_CONNECT);

      if (splitString) {
        setDate({
          startDate: formatDate(splitString[0])?.shortDateTime,
          endDate: formatDate(splitString[1])?.shortDateTime,
        });
      }
    }
  }, [tag]);

  return tag.tagType !== SEARCH_TAG.TAG ? (
    <S.SerachTagContainer color={SEARCH_TAG_COLOR[tag.tagType]}>
      {tag.tagType === SEARCH_TAG.DATE && (
        <S.TextContainer>
          {date?.startDate} {SYMBOL.DATE_CONNECT} {date?.endDate}
        </S.TextContainer>
      )}
      {tag.tagType === SEARCH_TAG.TITLE ||
      tag.tagType === SEARCH_TAG.VERSION ? (
        <S.TextContainer>{tag.tagValue}</S.TextContainer>
      ) : null}
      {tag.tagType === SEARCH_TAG.WRITER && (
        <S.TextContainer>
          {memberList
            .filter(member => member.memberId === Number(tag.tagValue))
            .map(filteredMember => filteredMember.name)}
        </S.TextContainer>
      )}
      <S.IconContainer onClick={() => onDeleteTag(tag)}>
        {SYMBOL.CLOSE}
      </S.IconContainer>
    </S.SerachTagContainer>
  ) : (
    <S.SerachTagContainer color={TAG_COLOR[tag.tagValue as TagType]}>
      <S.TextContainer>{tag.tagValue}</S.TextContainer>
      <S.IconContainer onClick={() => onDeleteTag(tag)}>
        {SYMBOL.CLOSE}
      </S.IconContainer>
    </S.SerachTagContainer>
  );
}

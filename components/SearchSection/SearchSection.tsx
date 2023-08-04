import * as S from "./SearchSection.styled";
import DropDownTag from "./DropDownTag";
import { useState, Dispatch, SetStateAction } from "react";
import { TAG_LIST } from "@/constants/Tag";
import { MemberType } from "@/types";
import Tag from "../\bTag";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import SearchTag from "./SearchTag";
import { SearchType } from "@/types";
import { TYPE_LIST, SEARCH_TAG_LIST } from "@/constants/Tag";
import { it } from "node:test";

export const DEFAULT_TIME = {
  START_TIME: "00:00:00",
  END_TIME: "23:59:59",
  TIME_FORMAT: "HH:mm",
  FULL_TIME_FORMAT: `YYYY-MM-DD`,
} as const;

type SearchTagType = {
  tagType: SearchType;
  tagValue: string;
};

export default function SearchSection() {
  const { START_TIME, END_TIME, TIME_FORMAT, FULL_TIME_FORMAT } = DEFAULT_TIME;
  const [type, setType] = useState<string>("issue");
  const [searchTag, setSearchTag] = useState<SearchType | string>("TAG");
  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState("");
  const [tagList, setTagList] = useState<SearchTagType[]>([]);
  const [schedule, setSchedule] = useState<any>();
  const [memberList, setMemberList] = useState<MemberType[]>([]);
  const router = useRouter();
  const projectId = router.query.id;

  // useEffect(() => {
  //   if (projectId) {
  //     api.getProjectMembers(projectId as string).then(response => {
  //       setMemberList(response.result.memberList);
  //     });
  //   }
  // }, []);

  const onChooseTag = ({ tagType, tagValue }: SearchTagType) => {
    const filteredList = tagList.filter((tag: any) => tag.tagType !== tagType);
    setTagList([
      ...filteredList,
      {
        tagType,
        tagValue,
      },
    ]);
  };

  const onSetText = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    type: SearchType,
  ) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      if (type === "TITLE") {
        onChooseTag({ tagType: "TITLE", tagValue: title });
        setTitle("");
      }
      if (type === "WRITER") {
        onChooseTag({ tagType: "WRITER", tagValue: memberName });
        setMemberName("");
      }
    }
  };

  const onChangeDate = (
    range: any,
    setSchedule: Dispatch<SetStateAction<any>>,
  ) => {
    const startDate = range?.[0]?.format();
    const endDate = range?.[1]?.format();
    onChooseTag({ tagType: "DATE", tagValue: `${startDate}~${endDate}` });
  };

  return (
    <S.MainContainer>
      <S.SearchSection>
        <DropDownTag menuList={TYPE_LIST} height="96px" setMenuType={setType} />
        <DropDownTag
          menuList={SEARCH_TAG_LIST}
          height="240px"
          setMenuType={setSearchTag}
        />
        {searchTag === "TAG" && (
          <S.SearchInputBox height="500px">
            {TAG_LIST.map(tag => (
              <S.TagSection
                onClick={() => onChooseTag({ tagType: "TAG", tagValue: tag })}
              >
                <Tag key={tag} tagText={tag} />
              </S.TagSection>
            ))}
          </S.SearchInputBox>
        )}
        {searchTag === "VERSION" && (
          <S.SearchInputBox height="300px">
            <S.VersionContainer>V 1.2.0</S.VersionContainer>
            <S.SlashBox></S.SlashBox>
            <S.VersionContainer>V 1.2.0</S.VersionContainer>
            <SearchIcon />
          </S.SearchInputBox>
        )}
        {searchTag === "TITLE" && (
          <S.SearchInputBox height="500px">
            <S.TextInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              onKeyDown={(e: any) => onSetText(e, "TITLE")}
            ></S.TextInput>
            <S.SearchIconBox>
              <SearchIcon
                onClick={() => {
                  onChooseTag({ tagType: "TITLE", tagValue: title });
                  setTitle("");
                }}
              />
            </S.SearchIconBox>
          </S.SearchInputBox>
        )}
        {searchTag === "DATE" && (
          <S.SearchInputBox height="330px">
            <S.RangePicker
              format={FULL_TIME_FORMAT}
              onChange={(range: any) => onChangeDate(range, setSchedule)}
            />
          </S.SearchInputBox>
        )}
        {searchTag === "WRITER" && (
          <S.SearchInputBox height="200px">
            <S.TextInput
              placeholder="멤버명을 입력하세요"
              value={memberName}
              onChange={(e: any) => setMemberName(e.target.value)}
              onKeyDown={(e: any) => onSetText(e, "WRITER")}
            ></S.TextInput>
            <S.SearchIconBox>
              <SearchIcon
                onClick={() => {
                  onChooseTag({ tagType: "WRITER", tagValue: memberName });
                  setMemberName("");
                }}
              />
            </S.SearchIconBox>
          </S.SearchInputBox>
        )}
      </S.SearchSection>
      <S.SelectedTagSection>
        {tagList.map((tag: any) => (
          <SearchTag tag={tag} />
        ))}
      </S.SelectedTagSection>
    </S.MainContainer>
  );
}

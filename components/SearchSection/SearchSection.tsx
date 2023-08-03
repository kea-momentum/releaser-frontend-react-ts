import * as S from "./SearchSection.styled";
import { useDropdown } from "@/hooks/useDropDown";
import DropDownTag from "./DropDownTag";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { TAG_LIST } from "@/constants/Tag";
import { TAG_COLOR } from "@/constants/Tag";
import { MemberType } from "@/types";
import Tag from "../\bTag";
import { TagType } from "@/types/issue";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import * as api from "@/api";

const TYPE_LIST = [
  { eng: "issue", kor: "이슈" },
  { eng: "release", kor: "릴리즈" },
];

const SEARCH_TAG_LIST = [
  { eng: "tag", kor: "태그" },
  { eng: "writer", kor: "작성자" },
  { eng: "version", kor: "버전" },
  { eng: "date", kor: "날짜" },
  { eng: "title", kor: "제목" },
];

export const DEFAULT_TIME = {
  START_TIME: "00:00:00",
  END_TIME: "23:59:59",
  TIME_FORMAT: "HH:mm",
  FULL_TIME_FORMAT: `YYYY-MM-DD HH:mm`,
} as const;

export default function SearchSection() {
  const { START_TIME, END_TIME, TIME_FORMAT, FULL_TIME_FORMAT } = DEFAULT_TIME;
  const [type, setType] = useState("issue");
  const [searchTag, setSearchTag] = useState("tag");
  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState("");
  const [tagList, setTagList] = useState<any>([]);
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

  console.log(tagList);
  const onChooseTag = ({
    tagType,
    tagValue,
  }: {
    tagType: string;
    tagValue: string;
  }) => {
    const filteredList = tagList.filter((tag: any) => tag.tagType !== tagType);

    setTagList([
      ...filteredList,
      {
        tagType,
        tagValue,
      },
    ]);
  };

  const onChangeDate = (
    range: any,
    setSchedule: Dispatch<SetStateAction<any>>,
  ) => {
    const startDate = range?.[0]?.format();
    const endDate = range?.[1]?.format();
    onChooseTag({ tagType: "date", tagValue: `${startDate}~${endDate}` });
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
        {searchTag === "tag" && (
          <S.SearchInputBox height="500px">
            {TAG_LIST.map(tag => (
              <S.TagSection
                onClick={() => onChooseTag({ tagType: "tag", tagValue: tag })}
              >
                <Tag key={tag} tagText={tag} />
              </S.TagSection>
            ))}
          </S.SearchInputBox>
        )}
        {searchTag === "version" && (
          <S.SearchInputBox height="300px">
            <S.VersionContainer>V 1.2.0</S.VersionContainer>
            <S.SlashBox></S.SlashBox>
            <S.VersionContainer>V 1.2.0</S.VersionContainer>
            <SearchIcon />
          </S.SearchInputBox>
        )}
        {searchTag === "title" && (
          <S.SearchInputBox height="500px">
            <S.TextInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            ></S.TextInput>
            <S.SearchIconBox>
              <SearchIcon
                onClick={() => {
                  onChooseTag({ tagType: "title", tagValue: title });
                  setTitle("");
                }}
              />
            </S.SearchIconBox>
          </S.SearchInputBox>
        )}
        {searchTag === "date" && (
          <S.SearchInputBox height="330px">
            <S.RangePicker
              showTime={{ format: TIME_FORMAT }}
              format={FULL_TIME_FORMAT}
              onChange={(range: any) => onChangeDate(range, setSchedule)}
            />
          </S.SearchInputBox>
        )}
        {searchTag === "writer" && (
          <S.SearchInputBox height="200px">
            <S.TextInput
              placeholder="멤버명을 입력하세요"
              value={memberName}
              onChange={(e: any) => setMemberName(e.target.value)}
            ></S.TextInput>
            <S.SearchIconBox>
              <SearchIcon
                onClick={() => {
                  onChooseTag({ tagType: "writer", tagValue: memberName });
                  setMemberName("");
                }}
              />
            </S.SearchIconBox>
          </S.SearchInputBox>
        )}
      </S.SearchSection>
    </S.MainContainer>
  );
}

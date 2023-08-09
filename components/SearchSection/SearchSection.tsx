import * as S from "./SearchSection.styled";
import DropDownTag from "./DropDownTag";
import { useState, Dispatch, SetStateAction } from "react";
import { TAG_LIST } from "@/constants/Tag";
import { MemberType, SearchResponseType } from "@/types";
import Tag from "../\bTag";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import SearchTag from "./SearchTag";
import { SearchType, SearchTagType } from "@/types";
import {
  TYPE_LIST,
  SEARCH_TAG_LIST_ISSUE,
  SEARCH_TAG_LIST_RELEASE,
} from "@/constants/Tag";
import { useEffect } from "react";
import { useSearchMember } from "@/hooks/useSearchMember";
import * as api from "@/api";
import { createSearchApi } from "@/util/functions/createSearchApi";
import SearchList from "./SearchedList";
import { checkVersionType, checkValidVersion } from "@/util/functions/version";
import { Alert } from "@/util/Alert";

export const DEFAULT_TIME = {
  START_TIME: "00:00:00",
  END_TIME: "23:59:59",
  TIME_FORMAT: "HH:mm",
  FULL_TIME_FORMAT: `YYYY-MM-DD`,
} as const;

export default function SearchSection() {
  const router = useRouter();
  const projectId = router.query.id;
  const { FULL_TIME_FORMAT } = DEFAULT_TIME;
  const [type, setType] = useState<string>("issue");
  const [searchTag, setSearchTag] = useState<SearchType | string>("TITLE");
  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState("");
  const [tagList, setTagList] = useState<SearchTagType[]>([]);
  const [member, setMember] = useState<MemberType>();
  const [version, setVersion] = useState({
    startVersion: "",
    endVersion: "",
  });
  const [searchedResult, setSearchResult] = useState<SearchResponseType>({
    getIssueInfoList: [],
    getReleaseInfoList: [],
  });

  const filteredMemberList = useSearchMember({
    searchText: memberName,
    projectId: projectId as string,
  });
  const memberDropDownHeight = `${filteredMemberList.length * 40}px`;

  useEffect(() => {
    const apiValue = createSearchApi(type, tagList);
    api
      .getSearchResult({ projectId: projectId as string, apiValue: apiValue })
      .then(response => {
        setSearchResult(response.result);
      });
  }, [tagList]);

  useEffect(() => {
    setTagList([]);
    setSearchTag("TITLE");
  }, [type]);

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

  const onDeleteTag = ({ tagType, tagValue }: SearchTagType) => {
    const filteredList = tagList.filter((tag: any) => tag.tagType !== tagType);
    setTagList([...filteredList]);
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
    }
  };

  const onChangeDate = (range: any) => {
    const startDate = range?.[0]?.format();
    const endDate = range?.[1]?.format();
    onChooseTag({ tagType: "DATE", tagValue: `${startDate}~${endDate}` });
  };

  const onSetVersion = () => {
    if (
      checkValidVersion(version.startVersion) &&
      checkValidVersion(version.endVersion)
    ) {
      onChooseTag({
        tagType: "VERSION",
        tagValue: `${version.startVersion}~${version.endVersion}`,
      });
    } else {
      Alert.error("올바른 형식의 버전을 입력해주세요");
    }
  };

  const onChangeVersion = ({
    versionType,
    e,
  }: {
    versionType: string;
    e: any;
  }) => {
    if (versionType === "start") {
      setVersion({
        ...version,
        startVersion: e.target.value,
      });
    }
    if (versionType === "end") {
      setVersion({
        ...version,
        endVersion: e.target.value,
      });
    }
  };

  return (
    <S.MainContainer>
      <S.SearchSection>
        <DropDownTag menuList={TYPE_LIST} height="96px" setMenuType={setType} />
        {type === "release" && (
          <DropDownTag
            menuList={SEARCH_TAG_LIST_RELEASE}
            height={"96px"}
            setMenuType={setSearchTag}
          />
        )}
        {type === "issue" && (
          <DropDownTag
            menuList={SEARCH_TAG_LIST_ISSUE}
            height={"240px"}
            setMenuType={setSearchTag}
          />
        )}

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
            <S.VersionContainer>V</S.VersionContainer>
            <S.VersionInput
              onChange={(e: any) =>
                onChangeVersion({ versionType: "start", e })
              }
            />
            <S.SlashBox></S.SlashBox>
            <S.VersionContainer>V</S.VersionContainer>
            <S.VersionInput
              onChange={(e: any) => onChangeVersion({ versionType: "end", e })}
            />
            <SearchIcon onClick={onSetVersion} />
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
              onChange={(range: any) => onChangeDate(range)}
            />
          </S.SearchInputBox>
        )}
        {searchTag === "WRITER" && (
          <>
            <S.SearchInputBox height="200px">
              <S.TextInput
                placeholder="멤버명을 입력하세요"
                value={memberName}
                onChange={(e: any) => setMemberName(e.target.value)}
              ></S.TextInput>
            </S.SearchInputBox>

            <DropDownTag
              memberList={filteredMemberList}
              height={memberDropDownHeight}
              setMember={setMember}
              setTagList={setTagList}
              tagList={tagList}
              setMemberName={setMemberName}
            />
          </>
        )}
      </S.SearchSection>
      <S.SelectedTagSection>
        {tagList.map((tag: any) => (
          <SearchTag
            tag={tag}
            onDeleteTag={onDeleteTag}
            memberList={filteredMemberList}
          />
        ))}
      </S.SelectedTagSection>
      {searchedResult && projectId && (
        <S.SearchedListContainer>
          <SearchList
            searchedResult={searchedResult}
            projectId={projectId as string}
          />
        </S.SearchedListContainer>
      )}
    </S.MainContainer>
  );
}

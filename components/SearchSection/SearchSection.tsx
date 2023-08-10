import * as S from "./SearchSection.styled";
import DropDownTag from "./DropDownTag";
import { useState, useEffect, ChangeEvent } from "react";
import {
  TAG_LIST,
  TYPE_LIST,
  SEARCH_TAG_LIST_ISSUE,
  SEARCH_TAG_LIST_RELEASE,
  SEARCH_TAG,
  DEFAULT_TIME,
  CONTENT_TYPE,
} from "@/constants";
import {
  MemberType,
  SearchResponseType,
  SearchType,
  SearchTagType,
} from "@/types";
import Tag from "../\bTag";
import SearchIcon from "@/public/images/SearchIcon.svg";
import { useRouter } from "next/router";
import SearchTag from "./SearchTag";
import { useSearchMember } from "@/hooks/useSearchMember";
import * as api from "@/api";
import SearchList from "./SearchedList";
import { Alert, createSearchApi, checkValidVersion } from "@/util";
import { RangePickerBaseProps } from "antd/lib/date-picker/generatePicker";

export default function SearchSection() {
  const router = useRouter();
  const projectId = router.query.id;
  const { FULL_TIME_FORMAT } = DEFAULT_TIME;
  const [type, setType] = useState<string>("issue");
  const [searchTag, setSearchTag] = useState<SearchType | string>(
    SEARCH_TAG.TITLE,
  );
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
    setSearchTag(SEARCH_TAG.TITLE);
  }, [type]);

  const onChooseTag = ({ tagType, tagValue }: SearchTagType) => {
    const filteredList = tagList.filter(
      (tag: SearchTagType) => tag.tagType !== tagType,
    );

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
      if (type === SEARCH_TAG.TITLE) {
        onChooseTag({ tagType: SEARCH_TAG.TITLE, tagValue: title });
        setTitle("");
      }
    }
  };

  const onChangeDate = (range: any) => {
    const startDate = range?.[0]?.format();
    const endDate = range?.[1]?.format();
    onChooseTag({
      tagType: SEARCH_TAG.DATE,
      tagValue: `${startDate}~${endDate}`,
    });
  };

  const onSetVersion = () => {
    if (
      checkValidVersion(version.startVersion) &&
      checkValidVersion(version.endVersion)
    ) {
      onChooseTag({
        tagType: SEARCH_TAG.VERSION,
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
        {type === CONTENT_TYPE.RELEASE && (
          <DropDownTag
            menuList={SEARCH_TAG_LIST_RELEASE}
            height={"96px"}
            setMenuType={setSearchTag}
          />
        )}
        {type === CONTENT_TYPE.ISSUE && (
          <DropDownTag
            menuList={SEARCH_TAG_LIST_ISSUE}
            height={"240px"}
            setMenuType={setSearchTag}
          />
        )}

        {searchTag === SEARCH_TAG.TAG && (
          <S.SearchInputBox height="500px">
            {TAG_LIST.map(tag => (
              <S.TagSection
                onClick={() =>
                  onChooseTag({ tagType: SEARCH_TAG.TAG, tagValue: tag })
                }
              >
                <Tag key={tag} tagText={tag} />
              </S.TagSection>
            ))}
          </S.SearchInputBox>
        )}
        {searchTag === SEARCH_TAG.VERSION && (
          <S.SearchInputBox height="300px">
            <S.VersionContainer>V</S.VersionContainer>
            <S.VersionInput
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChangeVersion({ versionType: "start", e })
              }
            />
            <S.SlashBox></S.SlashBox>
            <S.VersionContainer>V</S.VersionContainer>
            <S.VersionInput
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChangeVersion({ versionType: "end", e })
              }
            />
            <SearchIcon onClick={onSetVersion} />
          </S.SearchInputBox>
        )}
        {searchTag === SEARCH_TAG.TITLE && (
          <S.SearchInputBox height="500px">
            <S.TextInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              onKeyDown={(e: any) => onSetText(e, SEARCH_TAG.TITLE)}
            ></S.TextInput>
            <S.SearchIconBox>
              <SearchIcon
                onClick={() => {
                  onChooseTag({
                    tagType: SEARCH_TAG.TITLE,
                    tagValue: title,
                  });
                  setTitle("");
                }}
              />
            </S.SearchIconBox>
          </S.SearchInputBox>
        )}
        {searchTag === SEARCH_TAG.DATE && (
          <S.SearchInputBox height="330px">
            <S.RangePicker
              format={FULL_TIME_FORMAT}
              onChange={(range: any) => onChangeDate(range)}
            />
          </S.SearchInputBox>
        )}
        {searchTag === SEARCH_TAG.WRITER && (
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
        {tagList.map((tag: SearchTagType) => (
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

import * as S from "./SearchSection.styled";
import { useDropdown } from "@/hooks/useDropDown";
import DropDownTag from "./DropDownTag";
import { useState } from "react";

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

export default function SearchSection() {
  const [type, setType] = useState("issue");
  const [searchTag, setSearchTag] = useState("tag");

  return (
    <S.MainContainer>
      <S.SearchSection>
        <DropDownTag menuList={TYPE_LIST} height="96px" setMenuType={setType} />
        <DropDownTag
          menuList={SEARCH_TAG_LIST}
          height="240px"
          setMenuType={setSearchTag}
        />
        <S.SearchInputBox></S.SearchInputBox>
      </S.SearchSection>
    </S.MainContainer>
  );
}

import * as S from "./SearchSection.styled";
import { useDropdown } from "@/hooks/useDropDown";
import DropDownTag from "./DropDownTag";

const menuList = [
  { eng: "issue", kor: "이슈" },
  { eng: "release", kor: "릴리즈" },
];

export default function SearchSection() {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  return (
    <S.MainContainer>
      <S.SearchSection>
        <DropDownTag menuList={menuList} />

        <S.TagBox>태그</S.TagBox>
        <S.SearchInputBox></S.SearchInputBox>
      </S.SearchSection>
    </S.MainContainer>
  );
}

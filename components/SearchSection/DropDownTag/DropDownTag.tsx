import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./DropDownTag.styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import * as api from "@/api";
import { Alert } from "@/util/Alert";
import { MemberType, SearchType } from "@/types";

export default function DropDownTag({
  menuList,
  height,
  memberList,
  setMenuType,
  setMember,
  setTagList,
  tagList,
  setMemberName,
  searchTag,
}: {
  menuList?: any;
  memberList?: MemberType[];
  height: string;
  setMenuType?: Dispatch<SetStateAction<string>>;
  setMember?: Dispatch<SetStateAction<MemberType | undefined>>;
  setTagList?: Dispatch<SetStateAction<any>>;
  setMemberName?: Dispatch<SetStateAction<string>>;
  tagList?: any;
  searchTag?: string;
}) {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");
  const [menu, setMenu] = useState();
  const [selectMember, setSelectedMember] = useState<string>();

  useEffect(() => {
    if (menuList) {
      setMenu(menuList[0].kor);
    }
    if (memberList && memberList?.length > 0) {
      setSelectedMember(memberList[0].name);
    }
  }, []);

  const onClickHandler = (menu: any) => {
    toggleDropdown();

    if (setMenuType) {
      setMenu(menu.kor);
      setMenuType(menu.eng);
    }
    if (setMember) {
      setMember(menu);
      setSelectedMember(menu.name);
      if (tagList && setTagList && setMemberName) {
        const filteredList = tagList.filter(
          (tag: any) => tag.tagType !== "WRITER",
        );
        setTagList([
          ...filteredList,
          {
            tagType: "WRITER",
            tagValue: menu.memberId,
          },
        ]);
      }
    }
  };

  return menuList ? (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {menu}
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI height={height}>
          {menuList &&
            menuList.map((menu: any) => (
              <S.DropDownList
                key={menu.eng}
                onClick={() => onClickHandler(menu)}
              >
                {menu.kor}
              </S.DropDownList>
            ))}
        </S.DropDownUI>
      )}
    </S.DropdownContainer>
  ) : (
    <S.MemberDropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {selectMember}
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI height={height}>
          {memberList &&
            memberList.map((member: MemberType) => (
              <S.DropDownList
                key={member.userId}
                onClick={() => onClickHandler(member)}
              >
                {member.name}
              </S.DropDownList>
            ))}
        </S.DropDownUI>
      )}
    </S.MemberDropdownContainer>
  );
}

import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./DropDownTag.styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import * as api from "@/api";
import { Alert } from "@/util/Alert";
import { SearchType } from "@/types";

export default function DropDownTag({
  menuList,
  height,
  setMenuType,
}: {
  menuList: any;
  height: string;
  setMenuType: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");
  const [menu, setMenu] = useState(menuList[0].kor);

  const onClickHandler = (menu: any) => {
    toggleDropdown();
    setMenu(menu.kor);
    setMenuType(menu.eng);
  };

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {menu}
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI height={height}>
          {menuList.map((menu: any) => (
            <S.DropDownList key={menu.eng} onClick={() => onClickHandler(menu)}>
              {menu.kor}
            </S.DropDownList>
          ))}
        </S.DropDownUI>
      )}
    </S.DropdownContainer>
  );
}

import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./DropDownTag.styled";
import { useEffect, useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import * as api from "@/api";
import { Alert } from "@/util/Alert";

export default function DropDownTag({ menuList }: { menuList: any }) {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      이슈
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI>
          {menuList.map((menu: any) => (
            <S.DropDownList key={menu.eng}>{menu.kor}</S.DropDownList>
          ))}
        </S.DropDownUI>
      )}
    </S.DropdownContainer>
  );
}

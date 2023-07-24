import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./ExportDropDown.styled";
import { useState } from "react";

const menuList = ["배포 허가", "배포 거부"];

export default function ExportDropDown() {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");

  const onClickHandler = (type: string) => {
    toggleDropdown();
    setExportState(type);
  };

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {exportState}
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI>
          {menuList.map(menu => (
            <S.DropDownList key={menu} onClick={() => onClickHandler(menu)}>
              {menu}
            </S.DropDownList>
          ))}
        </S.DropDownUI>
      )}
    </S.DropdownContainer>
  );
}

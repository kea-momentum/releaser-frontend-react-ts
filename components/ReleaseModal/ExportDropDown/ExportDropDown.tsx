import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./ExportDropDown.styled";
import { useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import * as api from "@/api";

const menuList = [
  { name: "Y", description: "배포 허가" },
  { name: "N", description: "배포 거부" },
];

export default function ExportDropDown({
  releaseId,
  user,
}: {
  releaseId: any;
}) {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");

  console.log(releaseId);
  const onClickHandler = (menu: any) => {
    toggleDropdown();
    setExportState(menu.description);
    console.log(releaseId);

    console.log(menu.name);
    api
      .postApprovals({ releaseId: releaseId, approval: menu.name })
      .then(response => {
        console.log(response);
      });
  };

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {exportState}
      <S.ToggleStyle />
      {isOpen && (
        <S.DropDownUI>
          {menuList.map(menu => (
            <S.DropDownList
              key={menu.name}
              onClick={() => onClickHandler(menu)}
            >
              {menu.description}
            </S.DropDownList>
          ))}
        </S.DropDownUI>
      )}
    </S.DropdownContainer>
  );
}

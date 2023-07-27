import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./ExportDropDown.styled";
import { useEffect, useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import * as api from "@/api";
import { Alert } from "@/util/Alert";

const menuList = [
  { name: "Y", description: "배포 허가" },
  { name: "N", description: "배포 거부" },
];

export default function ExportDropDown({
  releaseId,
  user,
  approvals,
  releaseType,
}: {
  releaseId: any;
  user: any;
  approvals: any;
  releaseType?: string;
}) {
  const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
  const [exportState, setExportState] = useState("배포 예정");

  useEffect(() => {
    if (approvals) {
      console.log(approvals);
      approvals.map((approval: any) => {
        if (approval.memberId === user.memberId) {
          if (approval.approval === "N") {
            setExportState("배포 거부");
          } else if (approval.approval === "Y") {
            setExportState("배포 허가");
          } else {
            setExportState("배포 예정");
          }
        }
      });
    }
  }, [approvals]);

  const onClickHandler = (menu: any) => {
    toggleDropdown();
    setExportState(menu.description);
    api
      .postApprovals({ releaseId: releaseId, approval: menu.name })
      .then(response => {
        if (response.isSuccess) {
          Alert.successWithResponse(
            `${menu.description}에 투표 하였습니다.`,
          ).then(response => {
            if (response.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          Alert.error(response.message);
        }
      });
  };

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      {releaseType !== "DEPLOYED" ? exportState : "배포 완료"}
      <S.ToggleStyle />
      {isOpen && releaseType !== "DEPLOYED" && (
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

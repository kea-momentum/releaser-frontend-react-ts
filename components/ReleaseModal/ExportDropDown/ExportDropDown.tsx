import { useDropdown } from "@/hooks/useDropDown";
import * as S from "./ExportDropDown.styled";
import { useEffect, useState } from "react";
import * as api from "@/api";
import { Alert } from "@/util";
import { EXPORT_MENU_LIST, RELEASE_TYPE, EXPORT_STATE } from "@/constants";

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
  const [exportState, setExportState] = useState(EXPORT_STATE.EXPECT_EXPORT);

  useEffect(() => {
    if (approvals) {
      console.log(approvals);
      approvals.map((approval: any) => {
        if (approval.memberId === user.memberId) {
          if (approval.approval === EXPORT_STATE.ENG_DISAPPROVE_EXPORT) {
            setExportState(EXPORT_STATE.DISAPPROVE_EXPORT);
          } else if (approval.approval === EXPORT_STATE.APPROVE_EXPORT) {
            setExportState(EXPORT_STATE.APPROVE_EXPORT);
          } else {
            setExportState(EXPORT_STATE.EXPECT_EXPORT);
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
      {releaseType !== RELEASE_TYPE.DEPLOYED
        ? exportState
        : EXPORT_STATE.EXPORTED}
      <S.ToggleStyle />
      {isOpen && releaseType !== RELEASE_TYPE.DEPLOYED && (
        <S.DropDownUI>
          {EXPORT_MENU_LIST.map(menu => (
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

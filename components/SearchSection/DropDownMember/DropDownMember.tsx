// import { useDropdown } from "@/hooks/useDropDown";
// import * as S from "../DropDownTag/DropDownTag.styled";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { ApiError } from "next/dist/server/api-utils";
// import * as api from "@/api";
// import { Alert } from "@/util/Alert";
// import { MemberType, SearchType } from "@/types";

// export default function DropDownTag({
//   menuList,
//   height,
//   setMemberType,
// }: {
//   menuList: any;
//   height: string;
//   setMemberType: Dispatch<SetStateAction<MemberType>>;
// }) {
//   const [isOpen, toggleDropdown, dropdownRef] = useDropdown();
//   const [menu, setMenu] = useState(menuList[0].kor);

//   const onClickHandler = (menu: any) => {
//     toggleDropdown();
//     setMenu(menu.kor);
//     setMenuType(menu.eng);
//   };

//   return (
//     <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
//       {menu}
//       {isOpen && (
//         <S.DropDownUI height={height}>
//           {menuList.map((menu: any) => (
//             <S.DropDownList key={menu.eng} onClick={() => onClickHandler(menu)}>
//               {menu.kor}
//             </S.DropDownList>
//           ))}
//         </S.DropDownUI>
//       )}
//     </S.DropdownContainer>
//   );
// }

import React, { SetStateAction, Dispatch } from "react";
import * as S from "./ModalButtons.styled";
import { FiXCircle, FiTrash2, FiCheckCircle } from "react-icons/fi";
import Router, { useRouter } from "next/router";
import { Alert } from "@/util/Alert";

export default function ModalButtons({
  type,
  setConfirm,
  setDelete,
  setCancel
}: {
  type: string;
  setConfirm?: Dispatch<SetStateAction<boolean>>;
  setDelete?: Dispatch<SetStateAction<boolean>>;
  setCancel?: Dispatch<SetStateAction<boolean>>;
}) {

  const wrapperStyle =
    type === "one"
      ? { width: "46px" }
      : type === "two"
      ? { width: "92px" }
      : { width: "138px" };

  const onClickCancel = () => {
    if (setCancel) setCancel(true);
  };

  const onClickConfirm = () => {
    if (setConfirm) setConfirm(true);
  };

  const onClickDelete = () => {
    if (setDelete) {
      setDelete(true);
    }
  };

  return (
    <S.Wrapper style={wrapperStyle}>
      <S.ButtonContainer onClick={onClickCancel}>
        <FiXCircle size={26} color="#FFFFFF" />
      </S.ButtonContainer>
      {type === "three" && (
        <S.ButtonContainer
          style={{ background: "#E36B68" }}
          onClick={onClickDelete}
        >
          <FiTrash2 size={24} color="#FFFFFF" />
        </S.ButtonContainer>
      )}
      {type !== "one" && (
        <S.ButtonContainer
          style={{ background: "#81A0D3" }}
          onClick={onClickConfirm}
        >
          <FiCheckCircle size={24} color="#FFFFFF" />
        </S.ButtonContainer>
      )}
    </S.Wrapper>
  );
}

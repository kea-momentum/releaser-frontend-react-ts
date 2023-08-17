import * as S from "./AddButton.styled";
import React from "react";
import { Plus } from "lucide-react";
import { CONTENT_TYPE } from "@/constants";

interface AddButtonProps {
  onClick: () => void;
  type: string;
}

export default function AddButton({ onClick, type }: AddButtonProps) {
  return (
    <S.Wrapper>
      <S.Group onClick={onClick}>
        <S.Content>
          {type === CONTENT_TYPE.PROJECT && <>Add New Project</>}
          {type === CONTENT_TYPE.ISSUE && <>Add New Issue</>}
          {type === CONTENT_TYPE.RELEASE && <>Add New Release</>}
        </S.Content>
        <Plus color="#575757" size={20} />
      </S.Group>
    </S.Wrapper>
  );
}

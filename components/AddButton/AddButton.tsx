import * as S from "./AddButton.styled"
import React from "react";
import {Plus} from 'lucide-react';

interface AddButtonProps {
    onClick: () => void;
    type: string;
}

export default function AddButton({onClick, type}: AddButtonProps) {
    return (
        <S.Wrapper>
            <S.Group onClick={onClick}>
                <S.Content>
                    {type === "project" && (
                        <>Add New Project</>
                    )}
                    {type === "issue" && (
                        <>Add New Issue</>
                    )}
                    {type === "release" && (
                        <>Add New Release</>
                    )}
                </S.Content>
                <Plus color="#575757" size={20} />
            </S.Group>
        </S.Wrapper>
    );
}
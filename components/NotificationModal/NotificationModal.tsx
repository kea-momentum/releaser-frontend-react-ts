import * as S from "./NotificationModal.styled";
import React, { Fragment } from "react";
import Notification from "../Notification/Notification";

export default function NotificationModal() {
    return (
        <S.Wrapper>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </S.Wrapper>
    );
}
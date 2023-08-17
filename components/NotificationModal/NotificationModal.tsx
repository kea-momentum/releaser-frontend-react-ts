import * as S from "./NotificationModal.styled";
import React, { Fragment, useEffect } from "react";
import Notification from "../Notification/Notification";
import { notificationHistory } from "@/api/alarm";

export default function NotificationModal() {
    useEffect(() => {
        // notificationHistory().then(response => { // FIXME: 페이징 구현
        //     if(response.isSuccess) {
        //         // isSuccess = true
        //     } else {
        //         // isSuccess = false
        //     }
        // });
    }, []);

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
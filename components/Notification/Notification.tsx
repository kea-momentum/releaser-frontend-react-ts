import * as S from "./Notification.styled";
import React, {useEffect, useState} from "react";
import { alarmHistoryContent } from "@/types/Alarm";

export default function Notification({data}: {data: alarmHistoryContent}) {
    const [formattedDate, setFormattedDate] = useState<string>("");
    useEffect(() => {
        console.log(">>> DATA\n", data);
        const date = new Date(data.date);
        const formatted = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        setFormattedDate(formatted);
    }, [data]);

    // const handleClickNoti = () => {

    // }

    return (
        <S.Wrapper>
            <S.LogoSection>
                <S.ImgWrapper>
                    <img src={data.projectImg} alt="Project Logo" />
                </S.ImgWrapper>
            </S.LogoSection>
            <S.MainInfoSection>
                <S.ProjectInfo>[{data.projectTitle}]</S.ProjectInfo>
                <S.NotificationInfo>{data.message}</S.NotificationInfo>
            </S.MainInfoSection>
            <S.RightInfoSection>
                <S.NotificationType>{data.type}</S.NotificationType>
                <S.DateInfo>{formattedDate}</S.DateInfo>
            </S.RightInfoSection>
        </S.Wrapper>
    );
}
import * as S from "./RealTimeAlarm.styled";
import React, {useEffect, useState} from "react";
import { RealtimeAlarmData } from "@/types/Alarm";

export default function RealTimeAlarm({alarmInfo}: {alarmInfo: RealtimeAlarmData}) {
    useEffect(() => { // TODO: 지울거
        console.log(">>> [RealTime] Alarm Data\n", alarmInfo);
    }, []);

    return (
        <S.MainContainer>
            <S.ContentSection>
                <S.ImageContent>
                    <S.ImgWrapper>
                        <img src={alarmInfo.projectImg} alt="Project Logo" />
                    </S.ImgWrapper>
                </S.ImageContent>
                <S.MessageContent>
                    <S.ProjectInfo>[{alarmInfo.projectName}]</S.ProjectInfo>
                    <S.NotificationInfo>{alarmInfo.message}</S.NotificationInfo>
                </S.MessageContent>
            </S.ContentSection>
            <S.ButtonSection>
                <S.MoreButton>More</S.MoreButton>
                <S.CancelButton>Close</S.CancelButton>
            </S.ButtonSection>
        </S.MainContainer>
    );
}
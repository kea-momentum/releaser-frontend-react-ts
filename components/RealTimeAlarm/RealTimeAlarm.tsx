import * as S from "./RealTimeAlarm.styled";
import React, {useEffect, useState} from "react";
import { RealtimeAlarmData } from "@/types/Alarm";
import { useRouter } from "next/router";

export default function RealTimeAlarm({alarmInfo}: {alarmInfo: RealtimeAlarmData}) {
    const router = useRouter();

    useEffect(() => {
        console.log(">>> REALTIME ALARM\n", alarmInfo);
    }, []);

    const handleClickMore = () => {
        if(alarmInfo.type === "Release Note") {
            router.push(`/Releases/${alarmInfo.projectId}?releaseId=${alarmInfo.releaseNoteId}`);
        } else if(alarmInfo.type === "Issue") {
            router.push(`/IssueBoard/${alarmInfo.projectId}?issueId=${alarmInfo.issueId}`);
        }
    }

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
                <S.MoreButton onClick={handleClickMore}>More</S.MoreButton>
                <S.CancelButton>Close</S.CancelButton>
            </S.ButtonSection>
        </S.MainContainer>
    );
}
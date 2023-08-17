import * as S from "./Notification.styled";
import React, {useEffect, useState} from "react";
// import { connectStomp } from "@/util/socket/stomp";
// import { alarmHistory } from "@/api/alarm";

export default function Notification() {
    // const [email, setEmail] = useState<string>("gnaryu@naver.com"); // FIXME: 하드코딩
    // const [message, setMessage] = useState<JSON>();

    // useEffect(() => {
    //     connectStomp({email, setMessageCallback: (receivedMessage: JSON) => {
    //         setMessage(receivedMessage);
    //     }});
    // }, [email]);
    // useEffect(() => {
    //     console.log(">>> Notification Message\n", message);
    // }, [message]);

    return (
        <S.Wrapper>
            <S.LogoSection>
                <S.ImgWrapper>
                    
                </S.ImgWrapper>
            </S.LogoSection>
            <S.MainInfoSection>
                <S.ProjectInfo>[프로젝트명]</S.ProjectInfo>
                <S.NotificationInfo>릴리즈 노트의 배포 동의 여부를 선택해주세요.</S.NotificationInfo>
            </S.MainInfoSection>
            <S.RightInfoSection>
                <S.NotificationType>Release Note</S.NotificationType>
                <S.DateInfo>2023.6.27</S.DateInfo>
            </S.RightInfoSection>
        </S.Wrapper>
    );
}
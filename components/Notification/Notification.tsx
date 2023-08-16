import * as S from "./Notification.styled";
import React, {useEffect, useState, useRef} from "react";
// import {Client, Message} from "@stomp/stompjs";
// import SockJS from "sockjs-client";
import { alarmHistory } from "@/api/alarm";

export default function Notification() {
    // const stompClient = useRef<Client | null>(null);
    const [email, setEmail] = useState<string>("gnaryu@naver.com"); // FIXME: 하드코딩
    const [message, setMessage] = useState<string>("");

    // useEffect(() => {
    //     const sockJs = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications?page=0&size=5`);
    //     stompClient.current = new Client({
    //         webSocketFactory: () => sockJs,
    //         debug: (str: string) => {
    //             console.log(str);
    //         },
    //     });

    //     stompClient.current.onConnect = (frame) => {
    //         const subscription = stompClient.current?.subscribe(`/queue/releaser.user.${email}`, (message: Message) => {
    //             console.log("In subscription");
    //             const messageBody = JSON.parse(message.body);
    //             console.log(">>> Notification\n", messageBody);
    //             setMessage(JSON.stringify(messageBody));
    //             message.ack();
    //         });

    //         return () => {
    //             subscription?.unsubscribe();
    //             if(stompClient.current) {
    //                 stompClient.current.deactivate();
    //                 console.log("Disconnect");
    //             }
    //         };
    //     };

    //     stompClient.current.activate();
    // }, []);
    // useEffect(() => {
    //     console.log(">>> Alarm Message\n", message);
    // }, [message]);


    useEffect(() => { // FIXME: sockjs 분리
        console.log("왜 안 돼");
        alarmHistory({email, page: 0, size: 5, setMessageCallback: (receivedMessage: string) => {
            setMessage(JSON.stringify(receivedMessage));
        }});
    }, [email]);
    useEffect(() => {
        console.log(">>> Notification Message\n", message);
    }, [message]);

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
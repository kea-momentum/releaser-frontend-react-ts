import { loginState } from "@/storage/atom";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import * as S from "./alarm.styled";
import RealTimeAlarm from "@/components/RealTimeAlarm";
import { RealtimeAlarmData, RabbitMQData } from "@/types/Alarm";

export default function AlarmSubscribe() {
    const handleIsLogin = useSetRecoilState<boolean>(loginState);
    const isLogin = useRecoilValue(loginState);
    const stompClient = useRef<Client | null>(null);
    const [rabbitMQMsg, setRabbitMQMsg] = useState<RabbitMQData>();
    const [alarmData, setAlarmData] = useState<RealtimeAlarmData>();
    
    useEffect(() => {
        if(sessionStorage.getItem("email")) {
            handleIsLogin(true);
        }
    }, []);
    // useEffect(() => {
    //     if (Notification.permission !== "granted") {
    //       try {
    //         Notification.requestPermission().then((permission) => {
    //             if(permission !== 'granted') return;
    //         });
    //       } catch(error) {
    //         if(error instanceof TypeError) {
    //             Notification.requestPermission((permission) => {
    //                 if(permission !== 'granted') return;
    //             });
    //         } else {
    //             console.error(error);
    //         }
    //       }
    //     }
    // }, []);

    if(isLogin) {
        console.log(">>> LOGIN");
        const sockJs = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/notification`);
        stompClient.current = new Client({
            webSocketFactory: () => sockJs,
            debug: (str: string) => {
                console.log(str);
            },
        });

        stompClient.current.onConnect = (frame) => {
            const subscription = stompClient.current?.subscribe(`/queue/releaser.user.${sessionStorage.getItem("email")?.toString()}`, (message: Message) => {
                console.log("In subscription.");
                const messageBody = JSON.parse(message.body);
                console.log("Received message: ", messageBody);
                setRabbitMQMsg(messageBody);

                // if (Notification.permission === "granted") {
                //     const notificationOptions = {
                //         body: messageBody.message,
                //         icon: "",
                //     };
                //     new Notification("Push Notification", notificationOptions);
                    
                //     console.log(">>> PUSH ALARM\n", notificationOptions);
                //     alert(notificationOptions.body);
                // }

                message.ack();
            });

            return () => {
                subscription?.unsubscribe();
                if(stompClient.current) {
                    stompClient.current.deactivate();
                    console.log("Disconnect");
                }
            };
        };
        stompClient.current.activate();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(">>> Notification Message\n", rabbitMQMsg);
        if(rabbitMQMsg) {
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);

            const extractAlarmMsg = {
                message: rabbitMQMsg.message,
                projectImg: rabbitMQMsg.projectImg,
                projectName: rabbitMQMsg.projectName
            };
            setAlarmData(extractAlarmMsg);
        }
    }, [rabbitMQMsg]);

    return (
        <Fragment>
            {alarmData && (
                <S.AlarmModal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <RealTimeAlarm alarmInfo={alarmData} />
                </S.AlarmModal>
            )}
        </Fragment>
    )
}
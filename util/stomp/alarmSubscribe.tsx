import { loginState } from "@/storage/atom";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function AlarmSubscribe() {
    const handleIsLogin = useSetRecoilState<boolean>(loginState);
    const isLogin = useRecoilValue(loginState);
    const stompClient = useRef<Client | null>(null);
    const [rabbitMQMsg, setRabbitMQMsg] = useState<JSON>();
    
    useEffect(() => {
        if(sessionStorage.getItem("email")) {
            handleIsLogin(true);
        }
    }, []);
    // useEffect(() => {
    //     if ("Notification" in window && Notification.permission !== "granted") {
    //       Notification.requestPermission().then(permission => {
    //         if (permission === "granted") {
    //           console.log("Notification permission granted.");
    //         }
    //       });
    //     }
    //     console.log("=== 왜 안 돼");
    //   }, []);
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

                if (Notification.permission === "granted") {
                    const notificationOptions = {
                        body: messageBody.message,
                        icon: "../../../images/Logo.svg",
                    };
                    new Notification("Push Notification", notificationOptions);
                    alert(notificationOptions.body);
                }

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

    useEffect(() => {
        console.log(">>> Notification Message\n", rabbitMQMsg);
    }, [rabbitMQMsg]);

    
    return (
        <div>ALARM</div>
    )
}
// import { privateApi } from "./getToken";
import {Client, Message} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Response } from "@/types";

export const alarmHistory = ({email, page, size, setMessageCallback}: {
    email: string;
    page: number;
    size: number;
    setMessageCallback: (message: string) => void;
}) => {
    const sockJs = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/notification`);
    const stompClient = new Client({
        webSocketFactory: () => sockJs,
        debug: (str) => {
            console.log(str);
        },
    });

    stompClient.onConnect = (frame) => {
        const token = window.sessionStorage.getItem("accessToken");
        const headers = {Authorization: `Bearer ${token}`};
        const subscription = stompClient.subscribe(`/queue/releaser.user.${email}`, (message) => {
            const messageBody = JSON.parse(message.body);
            setMessageCallback(messageBody);
            console.log(">>> [TEST] Notification Message\n", messageBody);
            message.ack();
        }, headers);

        return () => {
            subscription.unsubscribe();
            if(stompClient) {
                stompClient.deactivate();
                console.log("Disconnect");
            }
        };
    };
    
    stompClient.activate();
};
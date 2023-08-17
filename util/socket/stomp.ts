import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const connectStomp = ({email, setMessageCallback}: {
    email: string;
    setMessageCallback: (message: JSON) => void;
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
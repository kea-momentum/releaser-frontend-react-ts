import * as S from "./NotificationModal.styled";
import React, { Fragment, useEffect, useState, useRef } from "react";
import Notification from "../Notification/Notification";
import { notificationHistory } from "@/api/alarm";
import { alarmHistoryContent } from "@/types/Alarm";

export default function NotificationModal() {
    const [notifications, setNotifications] = useState<alarmHistoryContent[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = () => {
        notificationHistory(page, 5)
            .then(response => {
                if (response.isSuccess) {
                    if (response.result.content.length === 0) {
                        setHasMore(false);
                    } else {
                        setNotifications(response.result.content); // 기존 데이터를 대체
                        setPage(page + 1);
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
            });
    };

    useEffect(() => { // TODO: 지울거
        console.log(">>> NOTIFICATIONS\n", notifications);
    }, [notifications]);

    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadNotifications();
                }
            },
            {
                threshold: 0.1,
            }
        );

        const observerElement = document.querySelector("#observer");
        if (observerElement && observerRef.current) {
            observerRef.current.observe(observerElement);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore]);
    
    useEffect(() => {
        console.log(">>> LEN: ", notifications.length);
    }, [notifications]);

    return (
        <S.Wrapper>
            {notifications.map(notification => (
                <Notification key={notification.notificationId} data={notification} />
            ))}
            <div id="observer" style={{ height: "1px" }}></div>
            {hasMore ? (
                // <div>Loading more...</div>
                <div></div>
            ) : (
                <div>더 이상 알림이 없습니다.</div>
            )}
        </S.Wrapper>
    );
}
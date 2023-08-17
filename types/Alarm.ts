export type RealtimeAlarmData = {
    message: string;
    projectName: string;
    projectImg: string;
    projectId: number;
    issueId?: number;
    releaseNoteId?: number;
    type: string;
};

export type RabbitMQData = {
    date: number;
    issueId?: number;
    releaseNoteId?: number;
    message: string;
    projectId: number;
    projectImg: string;
    projectName: string;
    type: string;
}

export type alarmHistoryContent = {
    notificationId: string;
    type: string;
    projectTitle: string;
    projectImg: string;
    message: string;
    date: string;
    isRead: number;
}
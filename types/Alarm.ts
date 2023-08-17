export type RealtimeAlarmData = {
    message: string;
    projectName: string;
    projectImg: string;
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
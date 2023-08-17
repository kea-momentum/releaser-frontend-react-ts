import { privateApi } from "./getToken";
import { Response } from "@/types";

export const notificationHistory = async (
    page: number,
    size: number
): Promise<Response<any>> => {
    try {
        const response = await privateApi.get(`/api/notifications?page=${page}&size=${size}`);
        return response.data;
    } catch(error) {
        throw error;
    }
};
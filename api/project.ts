import { privateApi } from "./getToken";
import { Response } from "@/types";

export const projectRequest = async (): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(`api/projects/project`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const projectCreateRequest = async (
  requestData: any,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(`api/projects/project`, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const projectEditRequest = async (
  requestData: any,
  projectId: number,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.patch(`api/projects/${projectId}`, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

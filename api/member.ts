import { privateApi } from "./getToken";
import { Response } from "@/types";

export const getProjectMembers = async (
  projectId: string,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(`/api/members/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

export const deleteProjectMember = async (
  memberId: number,
): Promise<Response<any>> => {
  try {
    console.log(memberId);
    const response = await privateApi.post(`/api/members/${memberId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAddProjectMember = async (
  link: string,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(`/api/members/join/${link}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

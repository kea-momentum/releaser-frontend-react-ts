import { privateApi } from "./getToken";
import { Response } from "@/types";
import {
  GetProjectMembersResponseType,
  AddProjectMemberResponseType,
} from "@/types";

export const getProjectMembers = async (
  projectId: string,
): Promise<Response<GetProjectMembersResponseType>> => {
  try {
    const response = await privateApi.get(`/api/members/project/${projectId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProjectMember = async (
  memberId: number,
): Promise<Response<string>> => {
  try {
    console.log(memberId);
    const response = await privateApi.post(`/api/members/${memberId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAddProjectMember = async (
  link: string,
): Promise<Response<AddProjectMemberResponseType>> => {
  try {
    const response = await privateApi.post(`/api/members/join/${link}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

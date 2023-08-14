import { privateApi } from "./getToken";
import { Response } from "@/types";

export const issueBoardList = async ( idObject: {
    id: any;
}): Promise<Response<any>> => {
    try {
        const response = await privateApi.get(
            `/api/issues/project/${idObject.id}`,
        );
        return response.data;
    } catch(error) {
        throw error;
    }
};

export const issueCreate = async (
    requestData: any,
    idObject: number
): Promise<Response<any>> => {
    try {
        const response = await privateApi.post(`/api/issues/${idObject}`, requestData);
        return response.data;
    } catch(error) {
        throw error;
    }
};

export const issueEdit = async (
  requestData: any,
  idObject: number
): Promise<Response<any>> => {
  try {
    const response = await privateApi.patch(`api/issues/issue/${idObject}`, requestData);
    return response.data;
  } catch(error) {
    throw error;
  }
};

export const getDoneNotConnectedIssues = async (
  projectId: string,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(
      `/api/issues/project/${projectId}/release?status=Done&connect=false`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIssue = async (
  issueId: number,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(
      `/api/issues/${issueId}/delete`
    );
    return response.data;
  } catch(error) {
    throw error;
  }
};

export const getEachIssue = async (
  issueId: number,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(
      `/api/issues/${issueId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeIssueStatus = async (
  issueId: number,
  toStatus: string
): Promise<Response<any>> => {
  try {
    const response = await privateApi.patch(
      `/api/issues/${issueId}?status=${toStatus}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
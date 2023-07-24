import { privateApi } from "./getToken";
import { Response } from "@/types";

export const releaseRequest = async (idObject: {
  id: any;
}): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(
      `/api/releases/projects?projectId=${idObject.id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNewRelease = async ({
  projectId,
  data,
}: {
  projectId: string;
  data: any;
}): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(
      `/api/releases/projects/${projectId}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReleaseData = async (
  releaseId: string,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(`/api/releases/${releaseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNewNodePosition = async (
  coordinates: any,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(
      `/api/releases/coordinates`,
      coordinates,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRelease = async ({
  releaseId,
  data,
}: {
  releaseId: string;
  data: any;
}): Promise<any> => {
  try {
    const response = await privateApi.patch(`/api/releases/${releaseId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postDeleteRelease = async (
  releaseId: string,
): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(`/api/releases/${releaseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

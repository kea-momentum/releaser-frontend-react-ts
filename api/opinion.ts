import { privateApi } from "./getToken";
import {
  Response,
  ReleaseType,
  ReleaseListGetResponse,
  OpinionType,
} from "@/types";

export const postOpinion = async ({
  releaseId,
  opinion,
}: {
  releaseId: number;
  opinion: string;
}): Promise<Response<OpinionType[]>> => {
  try {
    const response = await privateApi.post(
      `api/releases/${releaseId}/opinions`,
      { opinion },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOpinion = async ({
  opinionId,
}: {
  opinionId: number;
}): Promise<Response<OpinionType[]>> => {
  try {
    const response = await privateApi.post(
      `api/releases/opinions/${opinionId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postIssueOpinion = async ({
  issueId,
  opinion,
}: {
  issueId: number;
  opinion: string;
}): Promise<Response<OpinionType[]>> => {
  try {
    const response = await privateApi.post(
      `/api/issues/${issueId}/opinion`,
      { opinion },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIssueOpinion = async ({
  opinionId,
}: {
  opinionId: number;
}): Promise<Response<OpinionType[]>> => {
  try {
    const response = await privateApi.post(
      `api/issues/opinion/${opinionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
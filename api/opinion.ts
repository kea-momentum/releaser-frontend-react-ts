import { privateApi } from "./getToken";
import { Response, ReleaseType, ReleaseListGetResponse } from "@/types";

export const postOpinion = async ({
  releaseId,
  opinion,
}: {
  releaseId: number;
  opinion: string;
}): Promise<Response<any>> => {
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
}): Promise<Response<any>> => {
  try {
    const response = await privateApi.post(
      `api/releases/opinions/${opinionId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

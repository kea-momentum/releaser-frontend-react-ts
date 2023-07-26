import { privateApi } from "./getToken";
import { Response, ReleaseReportResponse } from "@/types";

export const getReleaseReport = async (
  projectId: string,
): Promise<Response<ReleaseReportResponse>> => {
  try {
    const response = await privateApi.get(
      `/api/releases/project/${projectId}/docs`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

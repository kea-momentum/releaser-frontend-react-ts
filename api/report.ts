import { privateApi } from "./getToken";
import { Response, ReleaseReportResponse, ReportPatchResponse } from "@/types";

export const getReleaseReport = async (
  projectId: string,
): Promise<Response<ReleaseReportResponse>> => {
  try {
    console.log(projectId);
    const response = await privateApi.get(
      `/api/releases/project/${projectId}/docs`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchReleaseReport = async ({
  projectId,
  summaryList,
}: {
  projectId: string;
  summaryList: any;
}): Promise<Response<ReportPatchResponse>> => {
  try {
    const response = await privateApi.patch(
      `/api/releases/project/${projectId}/docs`,
      summaryList,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

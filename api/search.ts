import { privateApi } from "./getToken";
import { Response, ReleaseReportResponse, ReportPatchResponse } from "@/types";
import { createSearchApi } from "@/util/functions/createSearchApi";
export const getSearchResult = async ({
  projectId,
  apiValue,
}: {
  projectId: string;
  apiValue: string | undefined;
}): Promise<Response<ReleaseReportResponse>> => {
  try {
    const response = await privateApi.get(
      `/api/projects/${projectId}/search?${apiValue}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

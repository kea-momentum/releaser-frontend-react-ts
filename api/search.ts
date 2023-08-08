import { privateApi } from "./getToken";
import { Response, SearchResponseType } from "@/types";

export const getSearchResult = async ({
  projectId,
  apiValue,
}: {
  projectId: string;
  apiValue: string | undefined;
}): Promise<Response<SearchResponseType>> => {
  try {
    const response = await privateApi.get(
      `/api/projects/${projectId}/search?${apiValue}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

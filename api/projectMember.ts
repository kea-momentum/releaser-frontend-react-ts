import { privateApi } from "./getToken";
import { Response } from "@/types";

export const projectMemberListRequest = async (idObject: {
    id: any;
  }): Promise<Response<any>> => {
    console.log(idObject.id);
    try {
      const response = await privateApi.get(
        `/api/members/project/${idObject.id}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
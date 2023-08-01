import { publicApi, privateApi } from "./getToken";
import { LoginResponse, SignUpResponse } from "@/types";
import { Response } from "@/types";

export const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse>> => {
  try {
    const response = await publicApi.post(`/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUpRequest = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<Response<SignUpResponse>> => {
  try {
    const response = await publicApi.post(`/api/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gooleLoginRequest = async (
  data: any,
): Promise<Response<LoginResponse>> => {
  try {
    const response = await publicApi.get(`oauth2/callback/google`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (): Promise<Response<any>> => {
  try {
    const response = await privateApi.get(`/api/users/images`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAuthEmailRequest = async ({
  email,
}: {
  email: string;
}): Promise<Response<string>> => {
  try {
    console.log(email);
    const response = await publicApi.post(`/api/auth/emails`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

type ConfirmEmailCodeResponse = {
  email: string;
};

export const postConfirmEmailCode = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}): Promise<Response<ConfirmEmailCodeResponse>> => {
  try {
    const response = await publicApi.post(`api/auth/emails?email=${email}`, {
      authCode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

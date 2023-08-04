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
  email: string | null;
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

type ConfirmPasswordEmailCodeResponse = {
  email: string;
  name: string;
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

export const postConfirmPasswordEmail = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}): Promise<Response<ConfirmPasswordEmailCodeResponse>> => {
  try {
    const response = await publicApi.post(`/api/auth/password`, {
      email,
      name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postConfirmPasswordEmailCode = async ({
  email,
  name,
  authCode,
}: {
  email: string;
  name: string;
  authCode: string;
}): Promise<Response<ConfirmPasswordEmailCodeResponse>> => {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await publicApi.post(
      `api/auth/password?email=${email}&name=${encodedName}`,
      {
        authCode,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postResetPassword = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<Response<ConfirmPasswordEmailCodeResponse>> => {
  try {
    const response = await publicApi.post(`/api/auth/password?email=${email}`, {
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

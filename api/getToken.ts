import axios, { AxiosInstance } from "axios";
import { getRefreshToken } from "@/storage/Cookie";
import { Alert } from "@/util";

const interceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: any) => {
    const token = window.sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const publicApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export const privateApi = interceptors(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
);

function postRefreshToken() {
  const refreshToken = getRefreshToken();
  const accessToken = window.sessionStorage.getItem("accessToken");

  const headers = {
    Refresh_Token: refreshToken,
    Access_Token: accessToken,
  };

  return publicApi
    .post(
      "/api/auth/refresh",
      {},
      {
        headers: headers,
      },
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error:", error.message);
      throw error;
    });
}

privateApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.data.statusCode === 401) {
      if (error.response.data.msg === "Unauthorized") {
        const tokenResponse = await postRefreshToken();

        if (tokenResponse.isSuccess) {
          const newAccessToken = tokenResponse.result.accessToken;

          window.sessionStorage.setItem("accessToken", newAccessToken);
          const originRequest = error.config;
          axios.defaults.headers.common.Authorization = `Bearer ${tokenResponse.result.accessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } else {
          Alert.errorWithResponse("로그인을 진행해주세요").then(response => {
            if (response.isConfirmed) {
              window.location.replace("/Login");
            }
          });
        }
      }
    }
  },
);

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@/storage/Cookie";

//토큰 인터셉터
const interceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

//토큰 필요한 경우
export const privateApi = interceptors(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
);

//refresh Token을 통해 access Token 요청
function postRefreshToken() {
  const refreshToken = getRefreshToken();
  const accessToken = getAccessToken();

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
      //TODO 에러 헨들링
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
        const originRequest = error.response.config;
        try {
          const tokenResponse = await postRefreshToken();
          const newAccessToken = tokenResponse.result.accessToken;
          setAccessToken(tokenResponse.result.accessToken);
          console.log(tokenResponse);

          // axios.defaults.headers.common.Authorization = `Bearer ${tokenResponse.result.accessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (
              error.response?.status === 404 ||
              error.response?.status === 422
            ) {
              alert("로그인을 진행해 주세요");
              window.location.replace("/Login");
            } else {
              alert("로그인을 진행해주세요");
            }
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

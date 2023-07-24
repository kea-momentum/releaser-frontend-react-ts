import { Cookies } from "react-cookie";

const cookiesRefresh = new Cookies();
const cookiesAccess = new Cookies();

export const setRefreshToken = (refreshToken: any) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  cookiesRefresh.set("refreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setAccessToken = (accessToken: any) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);
  console.log(accessToken);

  cookiesAccess.set("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getRefreshToken = () => {
  return cookiesRefresh.get("refreshToken");
};

export const getAccessToken = () => {
  return cookiesAccess.get("accessToken");
};

export const removeRefreshToken = () => {
  cookiesRefresh.remove("refreshToken", {
    sameSite: "strict",
    path: "/",
  });
};

export const removeAccessToken = () => {
  cookiesAccess.remove("accessToken", {
    sameSite: "strict",
    path: "/",
  });
};

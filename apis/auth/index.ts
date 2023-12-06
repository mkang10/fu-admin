import axiosClient from "@/utils/axiosClient/index";
export const END_POINT = {
  LOGIN: "/auth/login",
};

type UserLogin = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginResponse = {
  token: string;
  responseStatus: boolean;
  authErrors: [];
  returnTime: string;
};

export const loginAccount = (payload: UserLogin) => {
  return axiosClient.post<LoginResponse>(END_POINT.LOGIN, {
    email: payload.email,
    password: payload.password,
    RememberMe: payload.remember,
  });
};

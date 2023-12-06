import axiosClient from "@/utils/axiosClient/index";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
export const END_POINT = {
  GET: "/users/profile/",
  MANAGE: "/users/profile/",
  DELETE: "/users/profile/",
  GET_INFO: "/users/profile-info/",
};

export const getAllMember = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.GET}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getMemberInfo = (
  user_id: string | RequestCookie,
  access_token: string | null | RequestCookie
) => {
  return axiosClient.get(`${END_POINT.GET}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteUser = (user_id: string, access_token: string | null) => {
  return axiosClient.delete(`${END_POINT.GET}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getUserData = (
  user_id: string | RequestCookie,
  access_token: string | null | RequestCookie
) => {
  return axiosClient.get(`${END_POINT.GET_INFO}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

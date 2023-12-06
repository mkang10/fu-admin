import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  APPROVE: "/moderator/approve/",
  REJECT: "/moderator/reject/",
};

export const assignModerator = (
  user_id: string,
  access_token: string | null
) => {
  return axiosClient.patch(`${END_POINT.APPROVE}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const unassignModerator = (
  user_id: string,
  access_token: string | null
) => {
  return axiosClient.patch(`${END_POINT.REJECT}${user_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

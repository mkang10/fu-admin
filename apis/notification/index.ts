import axiosClient from "@/utils/axiosClient/index";

export const END_POINT = {
  GET: "/notification/all",
  READ: "/notification/detail/",
  HIDE: "/notification/hide/",
  DELETE: "/notification/delete/",
};

export const getAllNotification = (
  access_token: string | null,
  page: number
) => {
  return axiosClient.get(`${END_POINT.GET}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { page },
  });
};

export const getNotificationDetail = (
  notificaion_id: string,
  access_token: string | null
) => {
  return axiosClient.get(`${END_POINT.READ}${notificaion_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const hideNotification = (
  notificaion_id: string,
  access_token: string | null
) => {
  return axiosClient.patch(`${END_POINT.HIDE}${notificaion_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteNotification = (
  notificaion_id: string,
  access_token: string | null
) => {
  return axiosClient.delete(`${END_POINT.DELETE}${notificaion_id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

import axios, { AxiosResponse } from "axios";
// Change the url
const axiosServices = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 50000,
});

axiosServices.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err) => {
    return Promise.reject(err);
  }
);

axiosServices.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const axiosUpload = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 50000,
});

axiosUpload.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "multipart/form-data";
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const axiosClientUpload = axiosUpload;

export default axiosServices;

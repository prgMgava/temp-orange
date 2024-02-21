import axios from "axios";

import applyAppTokenRefreshInterceptor from "./interceptors/TokenRefreshInterceptor";

export const baseURLOrangeAPI = process.env.REACT_BACK_END_DOMAIN;

export const baseURl = baseURLOrangeAPI;
const axiosConfig = () => {
  const api = axios.create({
    baseURL: baseURl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (!error.response && error.message == "Network Error") ||
        error.response?.status === 401
      ) {
        window.location.href = "/404";
      }
      return Promise.reject(error);
    }
  );

  applyAppTokenRefreshInterceptor(api);

  return api;
};

export const api = axiosConfig();

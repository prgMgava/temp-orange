import axios from "axios";

import applyAppTokenRefreshInterceptor from "./interceptors/TokenRefreshInterceptor";

export const baseURLOrangeAPI = process.env.REACT_APP_BACK_END_DOMAIN;

export const baseURl = baseURLOrangeAPI;
const axiosConfig = () => {
  const api = axios.create({
    baseURL: `${baseURl}/api/v1`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3001/",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  applyAppTokenRefreshInterceptor(api);

  return api;
};

export const api = axiosConfig();

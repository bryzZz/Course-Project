/* eslint-disable no-underscore-dangle */
import axios from "axios";

import { AuthResponse } from "types/api";

export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log(error);

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const res = await axios.get<AuthResponse>(
          `${import.meta.env.VITE_API_URL}/refresh`,
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("token", res.data.accessToken);

        return api.request(originalRequest);
      } catch (error) {
        console.log("Unauthorized");
      }
    }

    throw error;
  }
);

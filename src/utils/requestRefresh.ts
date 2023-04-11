import axios, { GenericAbortSignal } from "axios";

import { AuthResponse } from "types";

export const requestRefresh = (signal: GenericAbortSignal) => {
  return axios.get<AuthResponse>(`${import.meta.env.VITE_API_URL}/refresh`, {
    withCredentials: true,
    signal,
  });
};

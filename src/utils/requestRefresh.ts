import axios, { GenericAbortSignal } from "axios";

import { AuthResponse } from "types";

import { API_URL } from "../http";

export const requestRefresh = (signal: GenericAbortSignal) => {
  return axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
    signal,
  });
};

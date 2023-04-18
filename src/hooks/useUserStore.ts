import { GenericAbortSignal } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AuthService } from "services/AuthService";
import { LoginData, RegisterData, User } from "types/api";
import { requestRefresh } from "utils";

interface UserState {
  user: User;
  isAuth: boolean;
  status: "init" | "loading" | "success" | "error";
  apiRequest: <T>(fn: () => Promise<T>, init?: boolean) => Promise<T | null>;
  checkAuth: (signal: GenericAbortSignal) => void;
  register: (data: RegisterData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: {} as User,
    isAuth: false,
    status: "init",
    apiRequest: async (fn, init) => {
      try {
        set({ status: init ? "init" : "loading" }, false, "loading");

        const res = await fn();

        set({ status: "success" }, false, "success");

        return res;
      } catch (error: any) {
        set({ status: "error" }, false, "error");

        console.error(error.response?.data?.message);

        return null;
      }
    },
    checkAuth: async (signal) => {
      const { apiRequest } = get();

      const res = apiRequest(() => requestRefresh(signal), true) as any;

      if (!res) return;

      localStorage.setItem("token", res.data.accessToken);

      set({ isAuth: true, user: res.data.user }, false, "checkAuth");
    },
    register: async ({ email, name, password }) => {
      const { apiRequest } = get();

      const res = await apiRequest(() =>
        AuthService.register(email, name, password)
      );

      if (!res) return;

      localStorage.setItem("token", res.data.accessToken);

      set({ isAuth: true, user: res.data.user }, false, "register");
    },
    login: async ({ email, password }) => {
      const { apiRequest } = get();

      const res = await apiRequest(() => AuthService.login(email, password));

      if (!res) return;

      localStorage.setItem("token", res.data.accessToken);

      set({ isAuth: true, user: res.data.user }, false, "login");
    },
    logout: async () => {
      const { apiRequest } = get();

      await apiRequest(AuthService.logout);

      localStorage.removeItem("token");

      set({ isAuth: false, user: {} as User }, false, "logout");
    },
  }))
);

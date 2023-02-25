/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */

import { GenericAbortSignal } from "axios";
import { makeAutoObservable } from "mobx";

import { AuthService } from "services/AuthService";
import { FlowReturn, LoginData, RegisterData, User } from "types";
import { requestRefresh } from "utils";

import { RootStore } from "./RootStore";

type Status = "init" | "loading" | "success" | "error";

export class UserStore {
  user!: User;

  isAuth = false;

  status: Status = "init";

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(value: User) {
    this.user = value;
  }

  apiRequest = async <T>(fn: () => Promise<T>, init?: boolean) => {
    try {
      this.status = init ? "init" : "loading";

      const res = await fn();

      this.status = "success";

      return res;
    } catch (error: any) {
      this.status = "error";
      console.error(error.response?.data?.message);

      return null;
    }
  };

  register = async ({ email, name, password }: RegisterData) => {
    const res = await this.apiRequest(() =>
      AuthService.register(email, name, password)
    );

    if (!res) return;

    localStorage.setItem("token", res.data.accessToken);

    this.setAuth(true);
    this.setUser(res.data.user);
  };

  login = async ({ email, password }: LoginData) => {
    const res = await this.apiRequest(() => AuthService.login(email, password));

    if (!res) return;

    localStorage.setItem("token", res.data.accessToken);

    this.setAuth(true);
    this.setUser(res.data.user);
  };

  logout = async () => {
    await this.apiRequest(AuthService.logout);

    localStorage.removeItem("token");

    this.setAuth(false);
    this.setUser({} as User);
  };

  *checkAuth(signal: GenericAbortSignal): FlowReturn<typeof requestRefresh> {
    const res = yield this.apiRequest(
      () => requestRefresh(signal),
      true
    ) as any;

    if (!res) return;

    localStorage.setItem("token", res.data.accessToken);

    this.setAuth(true);
    this.setUser(res.data.user);
  }
}

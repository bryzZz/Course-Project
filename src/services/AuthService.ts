import { AuthResponse } from "types";

import { api } from "../http";

export class AuthService {
  static async register(email: string, name: string, password: string) {
    return api.post<AuthResponse>("/register", { email, name, password });
  }

  static async login(email: string, password: string) {
    return api.post<AuthResponse>("/login", { email, password });
  }

  static async logout() {
    return api.post("/logout");
  }
}

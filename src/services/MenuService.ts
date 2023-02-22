import { Menu } from "types";

import { api } from "../http";

export class MenuService {
  static async create(title: string) {
    return api.post<Menu>("/menus", { title });
  }

  static async getAll() {
    return api.get<Menu[]>("/menus").then((r) => r.data);
  }
}

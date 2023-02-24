import { Menu } from "types";

import { api } from "../http";

interface CreateArgs {
  title: string;
  description?: string;
  image?: string;
}

export class MenuService {
  static async create(args: CreateArgs) {
    return api.post<Menu>("/menus", args);
  }

  static async getAll() {
    return api.get<Menu[]>("/menus").then((r) => r.data);
  }

  static async delete(id: string) {
    return api.delete("/menus", { params: { id } });
  }
}

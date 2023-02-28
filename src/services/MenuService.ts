import { Menu, MenuPublic, CreateMenuForm, MenusPatch } from "types";

import { api } from "../http";

interface CreateArgs extends Omit<CreateMenuForm, "image"> {
  image?: string;
}

export class MenuService {
  static async create(args: CreateArgs) {
    return api.post<Menu>("/menus", args);
  }

  static async get(id: string) {
    return api.get<Menu>("/menus", { params: { id } }).then((r) => r.data);
  }

  static async getAll() {
    return api.get<Menu[]>("/menus").then((r) => r.data);
  }

  static async update(updates: MenusPatch) {
    return api.put<Menu[]>("/menus", { updates }).then((r) => r.data);
  }

  static async delete(id: string) {
    return api.delete("/menus", { params: { id } });
  }

  static async getPublic(id: string) {
    return api
      .get<MenuPublic>("/menus-public", { params: { id } })
      .then((r) => r.data);
  }
}

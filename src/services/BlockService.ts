import { Block, BlocksPatch } from "types";

import { api } from "../http";

interface CreateParams {
  menuId: string;
  text: string;
  image?: string;
}

export class BlockService {
  static async create(args: CreateParams) {
    return api.post<Block>("/blocks", args);
  }

  static async get(menuId: string) {
    return api
      .get<Block[]>("/blocks", { params: { menuId } })
      .then((r) => r.data);
  }

  static async update(updates: BlocksPatch) {
    return api.put<Block[]>("/blocks", { updates }).then((r) => r.data);
  }
}

import { Block } from "types";
import { CreateBlockParams, BlocksPatch } from "types/api";

import { api } from "../http";

export class BlockService {
  static async create(args: CreateBlockParams) {
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

import { Block } from "types";

import { api } from "../http";

interface CreateArgs {
  menuId: string;
  text: string;
  image?: string;
}

export class BlockService {
  static async create(args: CreateArgs) {
    return api.post<Block>("/blocks", args);
  }

  static async get(menuId: string) {
    return api
      .get<Block[]>("/blocks", { params: { menuId } })
      .then((r) => r.data);
  }
}

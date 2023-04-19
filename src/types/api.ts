import {
  Block,
  BlockVariant,
  CreateDishForm,
  CreateSeparatorForm,
  Menu,
} from "types";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
};

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface CreateDishParams {
  id: string;
  menuId: string;
  type: BlockVariant.DISH;
  data: Omit<CreateDishForm, "image"> & { image?: string; id: string };
}

export interface CreateSeparatorParams {
  id: string;
  menuId: string;
  type: BlockVariant.SEPARATOR;
  data: CreateSeparatorForm & { id: string };
}

export type CreateBlockParams = CreateDishParams | CreateSeparatorParams;

export interface MenusPatch {
  [id: string]: Partial<
    Pick<Menu, "title" | "description" | "footer" | "isPublished">
  >;
}

export interface BlocksPatch {
  [id: string]: Partial<Pick<Block, "place">>;
}

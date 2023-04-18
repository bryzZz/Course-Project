export interface User {
  id: string;
  email: string;
  name: string;
}

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Menu {
  id: string;
  title: string;
  description: string | null;
  footer: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlockShared {
  id: string;
  place: number;
  menuId: string;
  createdAt: string;
  updatedAt: string;
}

interface DishBlock extends BlockShared {
  type: BlockVariant.DISH;
  data: Dish;
}
interface SeparatorBlock extends BlockShared {
  type: BlockVariant.SEPARATOR;
  data: Separator;
}

export type Block = DishBlock | SeparatorBlock;

export enum BlockVariant {
  DISH = "DISH",
  SEPARATOR = "SEPARATOR",
}

export interface Dish {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface Separator {
  id: string;
  text: string;
}

export interface MenuPublic extends Menu {
  blocks: Block[];
}

export interface CreateMenuForm {
  title: string;
  description?: string;
  footer?: string;
  image?: FileList;
}

export interface CreateDishForm {
  name: string;
  image: FileList;
  description: string;
}

export interface CreateSeparatorForm {
  text: string;
}

export interface CreateDishParams {
  menuId: string;
  type: BlockVariant.DISH;
  data: Omit<CreateDishForm, "image"> & { image?: string };
}

export interface CreateSeparatorParams {
  menuId: string;
  type: BlockVariant.SEPARATOR;
  data: CreateSeparatorForm;
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

// basic
export type FlowReturn<AsyncFunction extends (...args: any[]) => Promise<any>> =
  Generator<
    ReturnType<AsyncFunction>,
    void,
    Awaited<ReturnType<AsyncFunction>>
  >;

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

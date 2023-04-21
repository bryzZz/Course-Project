export interface Menu {
  id: string;
  title: string;
  description: string | null;
  footer: string | null;
  image: string | null;
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

export interface DishBlock extends BlockShared {
  type: "Dish";
  data: Dish;
}
export interface SeparatorBlock extends BlockShared {
  type: "Separator";
  data: Separator;
}

export type Block = DishBlock | SeparatorBlock;

export type BlockVariant = Block["type"];

export interface Dish {
  id: string;
  name: string;
  image?: string;
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

export interface DishForm {
  name: string;
  image: FileList;
  description: string;
}

export interface SeparatorForm {
  text: string;
}

export type BlockForm =
  | { type: "Dish"; data: DishForm }
  | { type: "Separator"; data: SeparatorForm };

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
  createdAt: string;
  updatedAt: string;
}

export interface Block {
  id: string;
  text: string;
  place: number;
  imageUrl?: string;
  menuId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuPublic extends Menu {
  Blocks: Block[];
}

export interface CreateMenuForm {
  title: string;
  description?: string;
  footer?: string;
  image?: FileList;
}

export interface CreateBlockForm {
  text: string;
  image?: FileList;
}

export type FlowReturn<AsyncFunction extends (...args: any[]) => Promise<any>> =
  Generator<
    ReturnType<AsyncFunction>,
    void,
    Awaited<ReturnType<AsyncFunction>>
  >;

const keysFactory = <T extends string>(allKey: T) => {
  const keys = {
    all: [allKey] as const,
    lists: () => [...keys.all, "list"] as const,
    list: (filters: string, search?: string) =>
      [...keys.lists(), { filters, search }] as const,
    details: () => [...keys.all, "detail"] as const,
    detail: (id: string) => [...keys.details(), id] as const,
  };

  return keys;
};

export const menuKeys = keysFactory("menus");
export const blockKeys = keysFactory("blocks");

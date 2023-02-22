export const menuKeys = {
  all: ["menus"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: (filters: string, search?: string) =>
    [...menuKeys.lists(), { filters, search }] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};

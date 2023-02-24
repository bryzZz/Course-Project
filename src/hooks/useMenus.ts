import { useMutation, useQuery, useQueryClient } from "react-query";

import { menuKeys } from "constants/menuKeys";
import { MenuService } from "services/MenuService";

export const useMenus = () => {
  const queryClient = useQueryClient();

  const res = useQuery({
    queryKey: menuKeys.lists(),
    queryFn: MenuService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: MenuService.create,
    onSettled: () => {
      queryClient.invalidateQueries(menuKeys.lists());
    },
  });

  const deleteMutation = useMutation({
    mutationFn: MenuService.delete,
    onSettled: () => {
      queryClient.invalidateQueries(menuKeys.lists());
    },
  });

  return Object.assign(res, { createMutation, deleteMutation });
};

import { useMutation, useQuery, useQueryClient } from "react-query";

import { menuKeys } from "constants/queryKeys";
import { MenuService } from "services/MenuService";

export const useMenus = () => {
  const queryClient = useQueryClient();

  const queryKey = menuKeys.lists();

  const res = useQuery({
    queryKey,
    queryFn: MenuService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: MenuService.create,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const updateMutation = useMutation({
    mutationFn: MenuService.update,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: MenuService.delete,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return Object.assign(res, { createMutation, updateMutation, deleteMutation });
};

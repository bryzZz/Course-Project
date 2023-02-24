import { useMutation, useQuery, useQueryClient } from "react-query";

import { blockKeys } from "constants/queryKeys";
import { BlockService } from "services/BlockService";

export const useBlocks = (menuId: string) => {
  const queryClient = useQueryClient();

  const res = useQuery({
    queryKey: blockKeys.list(menuId),
    queryFn: () => BlockService.get(menuId),
  });

  const createMutation = useMutation({
    mutationFn: BlockService.create,
    onSettled: () => {
      queryClient.invalidateQueries(blockKeys.list(menuId));
    },
  });

  // const deleteMutation = useMutation({
  //   mutationFn: MenuService.delete,
  //   onSettled: () => {
  //     queryClient.invalidateQueries(blockKeys.list(menuId));
  //   },
  // });

  return Object.assign(res, { createMutation /* , deleteMutation */ });
};

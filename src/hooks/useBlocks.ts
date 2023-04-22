import { useMutation, useQuery, useQueryClient } from "react-query";

import { blockKeys } from "constants/queryKeys";
import { BlockService } from "services/BlockService";
import { Block, DishBlock, SeparatorBlock } from "types";

export const useBlocks = (menuId: string) => {
  const queryClient = useQueryClient();

  const queryKey = blockKeys.list(menuId);

  const res = useQuery({
    queryKey,
    queryFn: () => BlockService.get(menuId),
  });

  const createBlock = useMutation({
    mutationFn: BlockService.upsert,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousBlocks = queryClient.getQueryData<Block[]>(queryKey);

      if (previousBlocks) {
        const maxPlace = Math.max(
          ...previousBlocks.map((block) => block.place),
          -1
        );

        const newBlock = {
          ...variables,
          place: maxPlace + 1,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        } as DishBlock | SeparatorBlock;

        queryClient.setQueriesData<Block[]>(queryKey, [
          ...previousBlocks,
          newBlock,
        ]);
      }

      return { previousBlocks };
    },
    onError: (err, variables, context) => {
      if (context?.previousBlocks) {
        queryClient.setQueryData<Block[]>(queryKey, context.previousBlocks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const updateBlock = useMutation({
    mutationFn: BlockService.upsert,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousBlocks = queryClient.getQueryData<Block[]>(queryKey);

      if (previousBlocks) {
        const newBlocks = previousBlocks.map((block) => {
          if (block.id === variables.id) {
            return { ...block, ...variables };
          }

          return block;
        });

        queryClient.setQueriesData<Block[]>(queryKey, newBlocks);
      }

      return { previousBlocks };
    },
    onError: (err, variables, context) => {
      if (context?.previousBlocks) {
        queryClient.setQueryData<Block[]>(queryKey, context.previousBlocks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const reorderBlocks = useMutation({
    mutationFn: BlockService.update,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBlocks = queryClient.getQueryData<Block[]>(queryKey);

      if (previousBlocks) {
        const newBlocks = previousBlocks.map((block) => {
          const place = variables[block.id].place as number;

          return { ...block, place };
        });

        queryClient.setQueryData<Block[]>(queryKey, newBlocks);
      }

      return { previousBlocks };
    },
    onError: (err, variables, context) => {
      if (context?.previousBlocks) {
        queryClient.setQueryData<Block[]>(queryKey, context.previousBlocks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const deleteBlock = useMutation({
    mutationFn: BlockService.delete,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousBlocks = queryClient.getQueryData<Block[]>(queryKey);

      if (previousBlocks) {
        const newBlocks = previousBlocks.filter(
          (block) => block.id !== variables
        );

        queryClient.setQueriesData<Block[]>(queryKey, newBlocks);
      }

      return { previousBlocks };
    },
    onError: (err, variables, context) => {
      if (context?.previousBlocks) {
        queryClient.setQueryData<Block[]>(queryKey, context.previousBlocks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return Object.assign(res, {
    createBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  });
};

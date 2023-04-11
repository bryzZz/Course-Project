/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { Block } from "components";
import { useBlocks } from "hooks";
import { Block as IBlock, BlocksPatch, CreateBlockForm } from "types";
import { convertToBase64 } from "utils";

import { CreateBlockModal } from "./CreateBlockModal";
import { DraggableList } from "./UI";

interface BlockListProps {
  menuId: string;
  className?: string;
}

export const BlockList: React.FC<BlockListProps> = ({ menuId, className }) => {
  const {
    data: blocks,
    isLoading: isBlocksLoading,
    create: { mutate: createBlock, isLoading: isBlockCreating },
    reorder: { mutate: reorderBlocks },
  } = useBlocks(menuId);

  const sortedBlocks = blocks?.sort((a, b) => a.place - b.place);

  const methods = useForm<CreateBlockForm>();
  const { handleSubmit, reset } = methods;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onCreateBlock = handleSubmit(async ({ text, image }) => {
    const data: Parameters<typeof createBlock>[0] = {
      menuId,
      text,
    };

    if (image?.length) {
      const imageBase64 = await convertToBase64(image[0]);

      data.image = imageBase64;
    }

    createBlock(data, {
      onSettled: () => {
        closeModal();
        reset();
      },
    });
  });

  const handleReorder = (reorderedBlocks: IBlock[]) => {
    reorderBlocks(
      reorderedBlocks.reduce((acc, cur, index) => {
        acc[cur.id] = { place: index };

        return acc;
      }, {} as BlocksPatch)
    );
  };

  return (
    <>
      <div className={twMerge("w-full max-w-3xl", className)}>
        <DraggableList
          items={sortedBlocks ?? []}
          droppableId="blocks"
          onReorder={handleReorder}
          render={(block, ref, p1, p2) => (
            <Block data={block} ref={ref} {...p1} {...p2} />
          )}
        />
        <div
          className={twMerge(
            "cursor-pointer rounded-md py-6 text-center text-lg text-opacity-30",
            "border-2 border-dashed border-base-content border-opacity-30",
            "hover:border-opacity-60 active:border-primary active:text-primary"
          )}
          onClick={openModal}
        >
          Add New Dish
        </div>
      </div>
      <CreateBlockModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        methods={methods}
        onCreate={onCreateBlock}
        isCreating={isBlockCreating}
      />
    </>
  );
};

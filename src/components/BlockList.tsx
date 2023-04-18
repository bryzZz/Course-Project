/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { Block } from "components";
import { useBlocks } from "hooks";
import {
  Block as IBlock,
  CreateDishForm,
  CreateSeparatorForm,
  BlockVariant,
} from "types";
import { BlocksPatch, CreateBlockParams } from "types/api";
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

  const dishMethods = useForm<CreateDishForm>();
  const separatorMethods = useForm<CreateSeparatorForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onCreateDish = dishMethods.handleSubmit(async (data) => {
    const res: CreateBlockParams = {
      type: BlockVariant.DISH,
      menuId,
      data: {
        ...data,
        image: await convertToBase64(data.image[0]),
      },
    };

    createBlock(res, {
      onSettled: () => {
        closeModal();
        dishMethods.reset();
      },
    });
  });

  const onCreateSeparator = separatorMethods.handleSubmit(async (data) => {
    const res: CreateBlockParams = {
      type: BlockVariant.SEPARATOR,
      menuId,
      data,
    };

    createBlock(res, {
      onSettled: () => {
        closeModal();
        separatorMethods.reset();
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
          Add New Block
        </div>
      </div>
      <CreateBlockModal
        isOpen={modalIsOpen}
        isCreating={isBlockCreating}
        onClose={closeModal}
        dishMethods={dishMethods}
        onCreateDish={onCreateDish}
        separatorMethods={separatorMethods}
        onCreateSeparator={onCreateSeparator}
      />
    </>
  );
};

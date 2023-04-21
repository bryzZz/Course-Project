/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

import { Block, BlockModal, ChooseBlockModal } from "components";
import { DraggableList, Loading } from "components/UI";
import { useBlocks } from "hooks";
import { Block as BlockType, BlockVariant, BlockForm } from "types";
import { BlocksPatch, CreateBlockParams } from "types/api";
import { convertToBase64 } from "utils";

interface BlockListProps {
  menuId: string;
  className?: string;
}

export const BlockList: React.FC<BlockListProps> = ({ menuId, className }) => {
  const {
    data: blocks,
    isLoading: isBlocksLoading,
    create: { mutate: createBlock },
    update: { mutate: updateBlock },
    reorder: { mutate: reorderBlocks },
  } = useBlocks(menuId);

  const sortedBlocks = blocks?.sort((a, b) => a.place - b.place);

  const [chosenBlock, setChosenBlock] = useState<BlockType | null>(null);
  const [blockVariant, setBlockVariant] = useState<BlockVariant>("Dish");
  const [blockAction, setBlockAction] = useState<"update" | "create">("create");

  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const openChooseModal = () => setIsChooseModalOpen(true);
  const closeChooseModal = () => setIsChooseModalOpen(false);

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const openBlockModal = () => setIsBlockModalOpen(true);
  const closeBlockModal = () => setIsBlockModalOpen(false);

  const handleChooseBlock = (blockVariant: BlockVariant) => {
    setBlockVariant(blockVariant);
    setChosenBlock(null);
    setBlockAction("create");

    closeChooseModal();
    openBlockModal();
  };

  const handleCreateBlock = async ({ type, data }: BlockForm) => {
    if (blockAction === "create") {
      const block = {
        id: uuidv4(),
        type,
        menuId,
        data: { ...data, id: uuidv4() },
      } as CreateBlockParams;

      if (type === "Dish") {
        block.data = {
          ...block.data,
          image: await convertToBase64(data.image[0]),
        };
      }

      return createBlock(block);
    }

    if (blockAction === "update" && chosenBlock) {
      const block = {
        id: chosenBlock.id,
        type: chosenBlock.type,
        menuId: chosenBlock.menuId,
        data: { ...data, id: chosenBlock.data.id },
      } as CreateBlockParams;

      if (type === "Dish") {
        block.data = {
          ...block.data,
          image: await convertToBase64(data.image[0]),
        };
      }

      return updateBlock(block);
    }

    return null;
  };

  const handleReorder = (reorderedBlocks: BlockType[]) => {
    reorderBlocks(
      reorderedBlocks.reduce((acc, cur, index) => {
        acc[cur.id] = { place: index };

        return acc;
      }, {} as BlocksPatch)
    );
  };

  const handleBlockClick = (block: BlockType) => {
    setChosenBlock(block);
    setBlockVariant(block.type);
    setBlockAction("update");
    openBlockModal();
  };

  return (
    <>
      <div className={twMerge("w-full max-w-3xl", className)}>
        <Loading loading={isBlocksLoading}>
          <DraggableList
            items={sortedBlocks ?? []}
            droppableId="blocks"
            onReorder={handleReorder}
            render={(block, ref, p1, p2) => (
              <Block
                data={block}
                ref={ref}
                {...p1}
                {...p2}
                onClick={() => handleBlockClick(block)}
              />
            )}
          />
        </Loading>
        <div
          className={twMerge(
            "cursor-pointer rounded-md py-6 text-center text-lg text-opacity-30",
            "border-2 border-dashed border-base-content border-opacity-30",
            "hover:border-opacity-60 active:border-primary active:text-primary"
          )}
          onClick={openChooseModal}
        >
          Add New Block
        </div>
      </div>
      <ChooseBlockModal
        isOpen={isChooseModalOpen}
        onClose={closeChooseModal}
        onChoose={handleChooseBlock}
      />
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={closeBlockModal}
        onSubmit={handleCreateBlock}
        blockVariant={blockVariant}
        initialData={chosenBlock}
      />
    </>
  );
};

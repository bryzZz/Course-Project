/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { computed } from "mobx";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";

import { Block, StrictModeDroppable as Droppable } from "components";
import { useBlocks } from "hooks";
import { BlocksPatch, CreateBlockForm } from "types";
import { convertToBase64, reorder } from "utils";

import { Input, Loading, Modal } from "./UI";

interface BlockListProps {
  menuId: string;
  className?: string;
}

export const BlockList: React.FC<BlockListProps> = ({ menuId, className }) => {
  const {
    data,
    isLoading: isBlocksLoading,
    create: { mutate: createBlock, isLoading: isBlockCreating },
    reorder: { mutate: reorderBlocks },
  } = useBlocks(menuId);

  const blocks = computed(() => data?.sort((a, b) => a.place - b.place)).get();

  const { register, handleSubmit, reset } = useForm<CreateBlockForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = handleSubmit(async ({ text, image }) => {
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

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || !blocks) return;

    const items = reorder(blocks, source.index, destination.index);

    reorderBlocks(
      items.reduce((acc, cur, index) => {
        acc[cur.id] = { place: index };

        return acc;
      }, {} as BlocksPatch)
    );

    // reorderBlocks(items.map(({ id }, index) => ({ id, place: index })));
  };

  return (
    <>
      <div className={`w-full max-w-3xl ${className}`}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks?.map((block, index) => (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided) => (
                      <Block
                        data={block}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className="cursor-pointer rounded-md border-2 border-dashed border-base-content border-opacity-30 py-6 text-center text-lg text-opacity-30 hover:border-opacity-60 active:border-primary active:text-primary"
          onClick={openModal}
        >
          Add New Dish
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onClose={closeModal} title="Create block">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label="Title"
            type="text"
            placeholder="Pepperoni pizza"
            {...register("text", { required: true })}
          />
          <Input
            className="file-input-bordered file-input w-full max-w-xs focus:outline-none"
            label="Image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={isBlockCreating} type="dots">
              Create
            </Loading>
          </button>
        </form>
      </Modal>
    </>
  );
};

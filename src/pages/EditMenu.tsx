/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Input, Loading, Modal } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { useBlocks } from "hooks";
import { MenuService } from "services/MenuService";
import { convertToBase64 } from "utils";

interface CreateBlockForm {
  text: string;
  image?: FileList;
}

export const EditMenu: React.FC = () => {
  const { id } = useParams();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.get(id as string),
  });

  const {
    data: blocks,
    isLoading: isBlocksLoading,
    createMutation: { mutate: createBlock, isLoading: isBlockCreating },
  } = useBlocks(id as string);

  const { register, handleSubmit, reset } = useForm<CreateBlockForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = handleSubmit(async ({ text, image }) => {
    const data: Parameters<typeof createBlock>[0] = {
      menuId: id as string,
      text,
    };

    if (image) {
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

  return (
    <>
      <Loading loading={isLoading} cover>
        <div className="flex flex-col items-center pt-4">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={menu?.imageUrl} alt={menu?.title} />
            </div>
          </div>
          <h2 className="text-xl font-bold">{menu?.title}</h2>
          <p className="text-md mb-4">{menu?.description}</p>

          <div className="flex w-full max-w-3xl flex-col gap-2">
            {blocks?.map((block) => (
              <div
                key={block.id}
                className="flex items-center gap-4 rounded-md bg-base-100 p-2 shadow hover:bg-base-200"
              >
                <div className="avatar">
                  <div className="w-16 rounded-md">
                    <img src={block?.imageUrl} alt={block?.text} />
                  </div>
                </div>
                <h4 className="text-md font-bold">{block.text}</h4>
              </div>
            ))}
            <div
              className="cursor-pointer rounded-md border-2 border-dashed border-base-content border-opacity-30 py-6 text-center text-lg text-opacity-30 hover:border-opacity-60 active:border-primary active:text-primary"
              onClick={openModal}
            >
              Add New Dish
            </div>
          </div>
        </div>
      </Loading>
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

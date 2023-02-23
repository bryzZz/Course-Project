/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { Loading, Modal } from "components/UI";
import { useMenus } from "hooks";

interface CreateMenuForm {
  title: string;
}

export const Home: React.FC = () => {
  const {
    data: menus,
    isLoading: isMenusLoading,
    createMutation: { mutate, isLoading: isMenuCreating },
  } = useMenus();

  const { register, handleSubmit } = useForm<CreateMenuForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = handleSubmit(({ title }) => {
    mutate(title, { onSettled: closeModal });
  });

  return (
    <div className="pt-6">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-bold">Menus</h2>
        <Loading loading={isMenusLoading}>
          <div className="flex flex-wrap gap-6">
            {menus &&
              menus.map(({ id, title }) => (
                <div
                  key={id}
                  className="cursor-pointer rounded-2xl py-10 px-12 shadow-xl"
                >
                  {title}
                </div>
              ))}
            <div
              className="cursor-pointer rounded-2xl border-2 border-dashed border-base-content border-opacity-30 py-10 px-12 hover:border-opacity-60"
              onClick={openModal}
            >
              Create New Menu
            </div>
          </div>
        </Loading>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal} title="Create menu">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            className="modal-action rounded-lg border border-base-content border-opacity-30 bg-transparent py-2 px-3 outline-none focus:border-opacity-100"
            placeholder="Title"
            type="text"
            {...register("title", { required: true })}
          />
          <button
            className="rounded-lg bg-base-content bg-opacity-[0.95] p-3 text-base-100 hover:bg-opacity-100"
            type="submit"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

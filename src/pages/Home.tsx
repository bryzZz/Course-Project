/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Menu } from "components";
import { Input, Loading, Modal } from "components/UI";
import { useMenus } from "hooks";
import { CreateMenuForm } from "types";
import { convertToBase64 } from "utils";

export const Home: React.FC = () => {
  const {
    data: menus,
    isLoading: isMenusLoading,
    createMutation: { mutate: createMenu, isLoading: isMenuCreating },
    deleteMutation: { mutate: deleteMenu },
    updateMutation: { mutate: updateMenu },
  } = useMenus();

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<CreateMenuForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = handleSubmit(
    async ({ title, description, footer, image }) => {
      const data: Parameters<typeof createMenu>[0] = {
        title,
        description,
        footer,
      };

      if (image?.length) {
        const imageBase64 = await convertToBase64(image[0]);

        data.image = imageBase64;
      }

      createMenu(data, {
        onSettled: () => {
          closeModal();
          reset();
        },
      });
    }
  );

  const handleEditMenu = (id: string) => () => navigate(`/edit/${id}`);
  const handleViewMenu = (id: string) => () => navigate(`/menu/${id}`);
  const handleDeleteMenu = (id: string) => () => deleteMenu(id);
  const handleTogglePublish = (id: string) => (value: boolean) => {
    updateMenu({ [id]: { isPublished: value } });
  };

  return (
    <div className="pt-6">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-bold">Menus</h2>
        <Loading loading={isMenusLoading}>
          <div className="flex flex-wrap gap-6">
            {menus &&
              menus.map((menu) => (
                <Menu
                  key={menu.id}
                  data={menu}
                  onEdit={handleEditMenu(menu.id)}
                  onView={handleViewMenu(menu.id)}
                  onDelete={handleDeleteMenu(menu.id)}
                  onTogglePublish={handleTogglePublish(menu.id)}
                />
              ))}
            <div
              className="basis-64 cursor-pointer rounded-2xl border-2 border-dashed border-base-content border-opacity-30 pt-16 text-center text-lg hover:border-opacity-60"
              onClick={openModal}
            >
              Create New Menu
            </div>
          </div>
        </Loading>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal} title="Create menu">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label="Title"
            placeholder="My First Menu"
            type="text"
            {...register("title", { required: true })}
          />
          <Input
            label="Description"
            placeholder="This menu is so cool"
            type="text"
            {...register("description")}
          />
          <Input
            label="Footer"
            placeholder=""
            type="text"
            {...register("footer")}
          />
          <Input
            className="file-input-bordered file-input w-full max-w-xs"
            label="Avatar"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <button className="btn w-full rounded-md" type="submit">
            <Loading loading={isMenuCreating} type="dots">
              Create
            </Loading>
          </button>
        </form>
      </Modal>
    </div>
  );
};

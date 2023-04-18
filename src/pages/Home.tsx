/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import QRCode from "qrcode";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { Menu } from "components";
import { Input, Loading, Modal } from "components/UI";
import { useMenus } from "hooks";
import { CreateMenuForm, Menu as IMenu } from "types";
import { convertToBase64 } from "utils";

export const Home: React.FC = () => {
  const {
    data: menus,
    isLoading: isMenusLoading,
    createMutation: { mutate: createMenu, isLoading: isMenuCreating },
    deleteMutation: { mutate: deleteMenu },
    updateMutation: { mutate: updateMenu },
  } = useMenus();

  const { register, handleSubmit, reset } = useForm<CreateMenuForm>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = handleSubmit(async ({ image, ...other }) => {
    const data: Parameters<typeof createMenu>[0] = other;

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
  });

  const handleDeleteMenu = (id: string) => () => deleteMenu(id);
  const handleRequestQr = (menu: IMenu) => async () => {
    const menuUrl = `${window.location.origin}/menu/${menu.id}`;

    const qrUrl = await QRCode.toDataURL(menuUrl, { width: 360 });

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", `${menu.title}-qr.png`);
    downloadLink.setAttribute("href", qrUrl);

    downloadLink.click();
  };
  const handleTogglePublish = (id: string) => (value: boolean) => {
    updateMenu({ [id]: { isPublished: value } });
  };

  return (
    <div className="container-main pt-6">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-bold">Menus</h2>
        <Loading loading={isMenusLoading}>
          <div className="grid auto-rows-[minmax(100px,_1fr)] grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-3">
            {menus?.map((menu) => (
              <Menu
                key={menu.id}
                data={menu}
                onRequestQr={handleRequestQr(menu)}
                editUrl={`/edit/${menu.id}`}
                viewUrl={`/menu/${menu.id}`}
                onDelete={handleDeleteMenu(menu.id)}
                onTogglePublish={handleTogglePublish(menu.id)}
              />
            ))}
            <div
              className={twMerge(
                "grid cursor-pointer place-items-center rounded-2xl text-center text-xl",
                "border-2 border-dashed border-base-content border-opacity-30 hover:border-opacity-60"
              )}
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

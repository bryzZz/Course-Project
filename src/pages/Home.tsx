import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Modal } from "components/UI";
import { menuKeys } from "constants/menuKeys";
import { useStore } from "hooks";
import { MenuService } from "services/MenuService";

interface CreateMenuForm {
  title: string;
}

export const Home: React.FC = observer(() => {
  const queryClient = useQueryClient();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { user, status, logout } = useStore((store) => store.userStore);

  const { data } = useQuery({
    queryKey: menuKeys.lists(),
    queryFn: MenuService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: MenuService.create,
    onSettled: () => {
      queryClient.invalidateQueries(menuKeys.lists());
    },
  });

  const { register, handleSubmit } = useForm<CreateMenuForm>();

  const onSubmit = handleSubmit(({ title }) => {
    createMutation.mutate(title, {
      onSettled: () => {
        setModalIsOpen(false);
      },
    });
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(data);

  return (
    <div className="Home">
      <header className="flex justify-between p-4">
        <p>
          Home {user.email} {user.name}
        </p>
        <button className="btn-primary btn" type="button" onClick={logout}>
          {status === "loading" ? "loading" : "Logout"}
        </button>
      </header>
      <button className="btn" type="button" onClick={openModal}>
        Create
      </button>
      {data && data.map(({ id, title }) => <div key={id}>{title}</div>)}
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
});

import React from "react";

import { UseFormReturn } from "react-hook-form";

import { CreateDishForm } from "types";

import { Input, Loading, Modal, Textarea } from "./UI";

interface CreateBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: UseFormReturn<CreateDishForm>;
  onCreate: () => void;
  isCreating: boolean;
}

export const CreateBlockModal: React.FC<CreateBlockModalProps> = ({
  isOpen,
  onClose,
  methods,
  onCreate,
  isCreating,
}) => {
  const { register } = methods;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create block">
      <form className="flex flex-col gap-4" onSubmit={onCreate}>
        <Input
          label="Title"
          type="text"
          placeholder="Pepperoni pizza"
          {...register("name", { required: true })}
        />
        <Input
          className="file-input-bordered file-input w-full max-w-xs focus:outline-none"
          label="Image"
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
        />
        <Textarea
          label="Description"
          placeholder="socages"
          rows={10}
          wrap="hard"
          maxLength={300}
          {...register("description", { required: true })}
        />

        <button className="btn w-full rounded-full" type="submit">
          <Loading loading={isCreating} type="dots">
            Create
          </Loading>
        </button>
      </form>
    </Modal>
  );
};

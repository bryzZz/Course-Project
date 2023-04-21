import React from "react";

import { useForm } from "react-hook-form";

import { Input, Textarea } from "components/UI";
import { DishBlock, DishForm } from "types";

interface DishProps {
  onSubmit: (data: DishForm) => void;
  initialData: DishBlock | null;
}

export const Dish: React.FC<DishProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit: handleSubmit_,
    reset,
  } = useForm<DishForm>({
    defaultValues: {
      name: initialData?.data.name,
      description: initialData?.data.description,
    },
  });

  const handleSubmit = handleSubmit_((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        Submit
      </button>
    </form>
  );
};

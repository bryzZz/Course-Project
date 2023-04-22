import React, { useLayoutEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { ImageInput } from "components/ImageInput";
import { Input, Textarea } from "components/UI";
import { DishBlock, DishForm } from "types";

interface DishProps {
  onSubmit: (data: DishForm) => void;
  initialData: DishBlock | null;
  canDelete: boolean;
  onDelete: () => void;
}

export const Dish: React.FC<DishProps> = ({
  onSubmit,
  initialData,
  canDelete,
  onDelete,
}) => {
  const {
    register,
    handleSubmit: handleSubmit_,
    reset,
    control,
    setValue,
  } = useForm<DishForm>();

  const handleSubmit = handleSubmit_((data) => {
    onSubmit(data);
    reset();
  });

  useLayoutEffect(() => {
    setValue("name", initialData?.data.name ?? "");
    setValue("description", initialData?.data.description ?? "");
    setValue("image", initialData?.data.image ?? "");
  }, [
    initialData?.data.description,
    initialData?.data.image,
    initialData?.data.name,
    setValue,
  ]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Title"
        type="text"
        placeholder="Pepperoni pizza"
        {...register("name", { required: true })}
      />
      <Controller
        name="image"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ImageInput
            value={value}
            onChange={onChange}
            alt="Dish"
            label="Image"
          />
        )}
      />
      <Textarea
        label="Description"
        placeholder="socages"
        rows={10}
        wrap="hard"
        maxLength={300}
        {...register("description", { required: true })}
      />
      <div>
        {canDelete && (
          <button className="btn rounded-md" type="button" onClick={onDelete}>
            Delete
          </button>
        )}
        <button className="btn rounded-md" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

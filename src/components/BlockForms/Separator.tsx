import React from "react";

import { useForm } from "react-hook-form";

import { Input } from "components/UI";
import { SeparatorBlock, SeparatorForm } from "types";

interface SeparatorProps {
  onSubmit: (data: SeparatorForm) => void;
  initialData: SeparatorBlock | null;
}

export const Separator: React.FC<SeparatorProps> = ({
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit: handleSubmit_,
    reset,
  } = useForm<SeparatorForm>({
    defaultValues: {
      text: initialData?.data.text,
    },
  });

  const handleSubmit = handleSubmit_((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Text"
        type="text"
        placeholder="Pepperoni pizza"
        {...register("text", { required: true })}
      />
      <button className="btn w-full rounded-full" type="submit">
        Submit
      </button>
    </form>
  );
};

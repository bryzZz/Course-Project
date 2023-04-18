import React, { useState } from "react";

import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { BlockVariant, CreateDishForm, CreateSeparatorForm } from "types";

import { Input, Loading, Modal, TabPanel, Textarea } from "./UI";

interface CreateBlockModalProps {
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  dishMethods: UseFormReturn<CreateDishForm>;
  onCreateDish: () => void;
  separatorMethods: UseFormReturn<CreateSeparatorForm>;
  onCreateSeparator: () => void;
}

export const CreateBlockModal: React.FC<CreateBlockModalProps> = ({
  isOpen,
  isCreating,
  onClose,
  dishMethods,
  onCreateDish,
  separatorMethods,
  onCreateSeparator,
}) => {
  const [currentTab, setCurrentTab] = useState(BlockVariant.DISH);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create block">
      <div className="tabs">
        <button
          type="button"
          className={twMerge(
            "tab tab-bordered",
            currentTab === BlockVariant.DISH && "tab-active"
          )}
          onClick={() => setCurrentTab(BlockVariant.DISH)}
        >
          Dish
        </button>
        <button
          type="button"
          className={twMerge(
            "tab tab-bordered",
            currentTab === BlockVariant.SEPARATOR && "tab-active"
          )}
          onClick={() => setCurrentTab(BlockVariant.SEPARATOR)}
        >
          Separator
        </button>
      </div>

      <TabPanel tabValue={BlockVariant.DISH} value={currentTab}>
        <form className="flex flex-col gap-4" onSubmit={onCreateDish}>
          <Input
            label="Title"
            type="text"
            placeholder="Pepperoni pizza"
            {...dishMethods.register("name", { required: true })}
          />
          <Input
            className="file-input-bordered file-input w-full max-w-xs focus:outline-none"
            label="Image"
            type="file"
            accept="image/*"
            {...dishMethods.register("image", { required: true })}
          />
          <Textarea
            label="Description"
            placeholder="socages"
            rows={10}
            wrap="hard"
            maxLength={300}
            {...dishMethods.register("description", { required: true })}
          />

          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={isCreating} type="dots">
              Create
            </Loading>
          </button>
        </form>
      </TabPanel>

      <TabPanel tabValue={BlockVariant.SEPARATOR} value={currentTab}>
        <form className="flex flex-col gap-4" onSubmit={onCreateSeparator}>
          <Input
            label="Text"
            type="text"
            placeholder="Pepperoni pizza"
            {...separatorMethods.register("text", { required: true })}
          />

          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={isCreating} type="dots">
              Create
            </Loading>
          </button>
        </form>
      </TabPanel>
    </Modal>
  );
};

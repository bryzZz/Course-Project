import React from "react";

import { FaEye, FaPen } from "react-icons/fa";
import { FiTrash, FiEyeOff } from "react-icons/fi";
import { RiCameraOffLine } from "react-icons/ri";

import type { Menu as IMenu } from "types";

import { Input } from "./UI";

interface MenuProps {
  data: IMenu;
  onDelete: () => void;
  onView: () => void;
  onEdit: () => void;
  onTogglePublish: (value: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({
  data,
  onView,
  onDelete,
  onEdit,
  onTogglePublish,
}) => {
  const { title, description, imageUrl, isPublished } = data;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="flex basis-64 flex-col justify-between gap-6 rounded-lg bg-base-100 pt-6 shadow">
      <div className="px-6">
        <div className="flex items-start justify-between">
          {imageUrl ? (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={imageUrl} alt={title} />
              </div>
            </div>
          ) : (
            <div className="grid h-12 w-12 place-items-center text-base-content text-opacity-50">
              <RiCameraOffLine className="h-6 w-6" />
            </div>
          )}
        </div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-xs">{description}</p>
      </div>

      <Input
        containerClassName="mt-auto pl-6"
        className="toggle-success"
        type="checkbox"
        label="Published"
        defaultChecked={isPublished}
        onChange={(e) => onTogglePublish(e.target.checked)}
      />

      <div className="flex items-center border-t border-base-300">
        <button
          className="mr-auto p-4 text-base-content text-opacity-60 hover:bg-base-300 hover:text-error"
          onClick={onDelete}
          type="button"
        >
          <FiTrash />
        </button>
        <button
          className="p-4 text-base-content text-opacity-60 hover:bg-base-300"
          onClick={onView}
          type="button"
        >
          <FaEye />
        </button>
        <button
          className=" p-4 text-base-content text-opacity-60 hover:bg-base-300"
          onClick={onEdit}
          type="button"
        >
          <FaPen />
        </button>
      </div>
    </div>
  );
};

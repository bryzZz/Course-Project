import React from "react";

import { FaEye, FaPen } from "react-icons/fa";

import type { Menu as IMenu } from "types";

interface MenuProps {
  data: IMenu;
  onDelete: () => void;
  onView: () => void;
  onEdit: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  data,
  onView,
  onDelete,
  onEdit,
}) => {
  const { title, description, imageUrl } = data;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="flex basis-64 cursor-pointer flex-col justify-between gap-6 rounded-lg bg-base-100 pt-6 shadow">
      <div className="px-6">
        <div className="flex items-start justify-between">
          {imageUrl && (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={imageUrl} alt={title} />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-xs">{description}</p>
      </div>

      <div className="flex items-center justify-end border-t border-base-300">
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

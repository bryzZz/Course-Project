import React from "react";

import { FaEye, FaPen } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { RiQrCodeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import type { Menu as IMenu } from "types";

import { MenuImage } from "./MenuImage";
import { Input } from "./UI";

interface MenuProps {
  data: IMenu;
  viewUrl: string;
  editUrl: string;
  onRequestQr: () => void;
  onDelete: () => void;
  onTogglePublish: (value: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({
  data,
  viewUrl,
  editUrl,
  onRequestQr,
  onDelete,
  onTogglePublish,
}) => {
  const { title, description, image, isPublished } = data;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="flex flex-col justify-between gap-6 rounded-lg bg-base-100 pt-6 shadow">
      <div className="px-6">
        <div className="flex items-start justify-between">
          <MenuImage src={image ?? undefined} alt={title} />
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
        <Link
          className="p-4 text-base-content text-opacity-60 hover:bg-base-300"
          to={viewUrl}
          target="_blank"
        >
          <FaEye />
        </Link>
        <Link
          className="p-4 text-base-content text-opacity-60 hover:bg-base-300"
          to={editUrl}
        >
          <FaPen />
        </Link>
        <button
          className="p-4 text-base-content text-opacity-60 hover:bg-base-300"
          onClick={onRequestQr}
          type="button"
        >
          <RiQrCodeLine />
        </button>
      </div>
    </div>
  );
};

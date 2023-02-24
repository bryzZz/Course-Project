import React from "react";

import { useNavigate } from "react-router-dom";

import type { Menu as IMenu } from "types";

interface MenuProps {
  data: IMenu;
  onDelete: () => void;
}

export const Menu: React.FC<MenuProps> = ({ data, onDelete }) => {
  const { id, title, description, imageUrl } = data;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit/${id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="basis-64 cursor-pointer rounded-lg bg-white p-6 pb-10 shadow"
      onClick={handleClick}
    >
      <div className="avatar">
        <div className="w-12 rounded-full ring ring-primary">
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <h3 className="text-lg">{title}</h3>
      <p className="text-xs">{description}</p>
      <button onClick={onDelete} type="button">
        Delete
      </button>
    </div>
  );
};

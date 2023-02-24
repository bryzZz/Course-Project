import React from "react";

import type { Menu as IMenu } from "types";

interface MenuProps {
  data: IMenu;
  onDelete: () => void;
}

export const Menu: React.FC<MenuProps> = ({ data, onDelete }) => {
  const { title, description, imageUrl } = data;

  return (
    <div className="basis-64 cursor-pointer rounded-lg bg-white p-6 pb-10 shadow">
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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { ChangeEvent, ComponentProps, useRef } from "react";

import { FaPen } from "react-icons/fa";
import { RiCameraOffLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface MenuImageProps extends Omit<ComponentProps<"img">, "onChange"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MenuImage: React.FC<MenuImageProps> = ({
  onChange,
  src,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <div
      className={twMerge(
        "placeholder avatar relative",
        onChange && "cursor-pointer"
      )}
    >
      {onChange && (
        <>
          <div
            className="absolute inset-0 rounded-full bg-base-100 opacity-0 hover:opacity-80"
            onClick={handleClick}
          >
            <FaPen />
          </div>
          <input
            className="hidden"
            ref={ref}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </>
      )}
      <div className="w-12 rounded-full bg-neutral-focus text-base-content text-opacity-50">
        {src ? (
          <img src={`${src}?${performance.now()}`} {...props} />
        ) : (
          <RiCameraOffLine className="h-6 w-6" />
        )}
      </div>
    </div>
  );
};

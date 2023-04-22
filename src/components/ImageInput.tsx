/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from "react";

import { RiCameraOffLine } from "react-icons/ri";

import { convertToBase64 } from "utils";

interface ImageInputProps {
  value?: string;
  onChange?: (image: string) => void;
  alt: string;
  label?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  value,
  onChange,
  alt,
  label,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const image = await convertToBase64(e.target.files[0]);
      onChange?.(image);
    }
  };

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <div className="form-control w-full" onClick={handleClick}>
      <label className="label cursor-pointer flex-col items-start gap-2 p-0">
        {label && <span className="label-text">{label}</span>}
        <div className="grid h-32 w-32 place-items-center overflow-hidden rounded-md border border-base-content border-opacity-20 text-base-content text-opacity-50">
          {value ? (
            <img className="h-full w-full object-cover" src={value} alt={alt} />
          ) : (
            <RiCameraOffLine className="h-10 w-10" />
          )}
        </div>
      </label>
      <input
        className="hidden"
        ref={ref}
        onChange={handleChange}
        type="file"
        accept="image/*"
      />
    </div>
  );
};

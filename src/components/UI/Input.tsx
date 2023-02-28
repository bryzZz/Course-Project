/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName, className, ...other }, ref) => {
    if (other.type === "checkbox") {
      return (
        <div className={twMerge("form-control w-full", containerClassName)}>
          <label className="label cursor-pointer justify-start gap-2 p-0">
            <span className="label-text">{label}</span>
            <input
              className={twMerge("toggle-primary toggle", className)}
              ref={ref}
              {...other}
            />
          </label>
        </div>
      );
    }
    return (
      <div className={twMerge("form-control w-full", containerClassName)}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          className={twMerge(
            "input-bordered input w-full focus:border-primary focus:outline-none",
            className
          )}
          ref={ref}
          {...other}
        />
      </div>
    );
  }
);

/* eslint-disable jsx-a11y/label-has-associated-control */
import { ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, containerClassName, className, ...other }, ref) => {
    return (
      <div className={twMerge("form-control w-full", containerClassName)}>
        <label className="label">
          {label && <span className="label-text">{label}</span>}
        </label>
        <textarea
          className={twMerge(
            "textarea-bordered textarea w-full resize-none focus:border-primary focus:outline-none",
            className
          )}
          ref={ref}
          {...other}
        />
      </div>
    );
  }
);

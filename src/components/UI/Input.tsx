/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...other }, ref) => {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          className="input-bordered input w-full focus:border-primary focus:outline-none"
          ref={ref}
          {...other}
        />
      </div>
    );
  }
);

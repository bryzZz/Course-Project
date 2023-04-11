import { ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import { Block as IBlock } from "types";

interface BlockProps extends ComponentProps<"div"> {
  data: IBlock;
  type?: "square" | "rectangle";
}

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, type = "square", className, ...other }, ref) => {
    if (type === "rectangle") {
      return (
        <div className="relative h-32 w-32" ref={ref} {...other}>
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src={data.imageUrl}
            alt=""
          />
          <h4 className="text-md font-bold">{data.text}</h4>
        </div>
      );
    }

    return (
      <div
        className={twMerge(
          "mb-2 flex items-center gap-4 rounded-md bg-base-100 p-2 shadow hover:bg-base-200",
          className
        )}
        ref={ref}
        {...other}
      >
        <div className="avatar">
          <div className="w-16 rounded-md">
            <img src={data?.imageUrl} alt={data?.text} />
          </div>
        </div>
        <h4 className="text-md font-bold">{data.text}</h4>
      </div>
    );
  }
);

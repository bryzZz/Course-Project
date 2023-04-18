import { ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import { BlockVariant, Block as BlockType } from "types";

interface BlockProps extends ComponentProps<"div"> {
  data: BlockType;
  dishClassName?: string;
  separatorClassName?: string;
}

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, dishClassName = "", separatorClassName = "", ...other }, ref) => {
    if (data.type === BlockVariant.DISH) {
      return (
        <div
          className={twMerge(
            "mb-2 flex items-start gap-4 rounded-md bg-base-100 p-2 shadow hover:bg-base-200",
            dishClassName
          )}
          ref={ref}
          {...other}
        >
          <div className="avatar">
            <div className="w-16 rounded-md">
              <img src={data?.data?.imageUrl} alt={data?.data?.name} />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold">{data?.data?.name}</h4>
            <p className="text-md whitespace-pre">{data?.data?.description}</p>
          </div>
        </div>
      );
    }

    if (data.type === BlockVariant.SEPARATOR) {
      return (
        <div
          className={twMerge(
            "mb-2 flex items-center p-2 hover:bg-base-200",
            separatorClassName
          )}
          ref={ref}
          {...other}
        >
          <div className="divider w-full">{data?.data?.text}</div>
        </div>
      );
    }

    return null;
  }
);

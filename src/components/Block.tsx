import React, { forwardRef } from "react";

import { Block as IBlock } from "types";

interface BlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: IBlock;
}

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, ...other }, ref) => {
    return (
      <div
        className="mb-2 flex items-center gap-4 rounded-md bg-base-100 p-2 shadow hover:bg-base-200"
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

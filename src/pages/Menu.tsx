import React from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Loading } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { useBlocks } from "hooks";
import { MenuService } from "services/MenuService";

export const Menu: React.FC = () => {
  const { id } = useParams();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.getPublic(id as string),
  });

  // const {
  //   data: blocks,
  //   isLoading: isBlocksLoading,
  //   createMutation: { isLoading: isBlockCreating },
  // } = useBlocks(id as string);

  return (
    <Loading loading={isLoading} cover>
      <div className="flex flex-col items-center pt-4">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={menu?.imageUrl} alt={menu?.title} />
          </div>
        </div>
        <h2 className="text-xl font-bold">{menu?.title}</h2>
        <p className="text-md mb-4">{menu?.description}</p>

        <div className="flex w-full max-w-3xl flex-col gap-2">
          {menu?.Blocks?.map((block) => (
            <div key={block.id} className="flex rounded-md bg-base-300 p-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={block?.imageUrl} alt={block?.text} />
                </div>
              </div>
              {block.text}
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
};

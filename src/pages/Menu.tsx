import React from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Block } from "components";
import { Loading } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { MenuService } from "services/MenuService";

export const Menu: React.FC = () => {
  const { id } = useParams();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.getPublic(id as string),
    select: (data) => ({
      ...data,
      Blocks: data.Blocks?.sort((a, b) => a.place - b.place),
    }),
  });

  return (
    <Loading loading={isLoading} cover>
      <div className="flex flex-col items-center pt-4">
        {menu?.imageUrl && (
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={menu?.imageUrl || ""} alt={menu?.title} />
            </div>
          </div>
        )}

        {menu?.title && <h2 className="text-xl font-bold">{menu.title}</h2>}

        {menu?.description && <p className="text-md">{menu.description}</p>}

        <div className="my-6 w-full max-w-3xl">
          {menu?.Blocks?.map((block) => (
            <Block key={block.id} data={block} />
          ))}
        </div>

        {menu?.footer && <p className="text-md mb-4">{menu.footer}</p>}
      </div>
    </Loading>
  );
};

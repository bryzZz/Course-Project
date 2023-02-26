/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { BlockList, StrictModeDroppable } from "components";
import { Input, Loading, Modal } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { useBlocks } from "hooks";
import { MenuService } from "services/MenuService";
import { convertToBase64 } from "utils";

export const EditMenu: React.FC = () => {
  const id = useParams().id as string;

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.get(id as string),
  });

  // const [blocks, setBlocks] = useState(blocksInitial || []);

  // useEffect(() => {
  //   setBlocks(blocksInitial || []);
  // }, [blocksInitial]);

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

        <BlockList menuId={id} className={menu?.footer ? "my-6" : ""} />

        {menu?.footer && <p className="text-md mb-4">{menu.footer}</p>}
      </div>
    </Loading>
  );
};

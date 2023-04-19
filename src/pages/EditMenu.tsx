/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ChangeEvent, useEffect, useMemo } from "react";

import debounce from "lodash.debounce";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { BlockList } from "components";
import { Input, Loading } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { MenuService } from "services/MenuService";

export const EditMenu: React.FC = () => {
  const id = useParams().id as string;

  const queryClient = useQueryClient();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.get(id as string),
  });

  const update = useMutation({
    mutationFn: MenuService.update,
    onSettled: () => {
      queryClient.invalidateQueries(menuKeys.detail(id as string));
    },
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    update.mutate({ [id]: { title: e.target.value } });
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    update.mutate({ [id]: { description: e.target.value } });
  };
  const handleChangeFooter = (e: ChangeEvent<HTMLInputElement>) => {
    update.mutate({ [id]: { footer: e.target.value } });
  };

  const debouncedChangeTitle = useMemo(
    () => debounce(handleChangeTitle, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const debouncedChangeDescription = useMemo(
    () => debounce(handleChangeDescription, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const debouncedChangeFooter = useMemo(
    () => debounce(handleChangeFooter, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeTitle.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-main pb-12">
      <Loading loading={isLoading}>
        <div className="flex flex-col items-center pt-4">
          {menu?.imageUrl && (
            <div className="avatar mb-2">
              <div className="w-20 rounded-full">
                <img src={menu?.imageUrl || ""} alt={menu?.title} />
              </div>
            </div>
          )}

          <Input
            className="h-auto text-center text-xl font-bold"
            containerClassName="w-auto"
            type="text"
            ghost
            defaultValue={menu?.title || ""}
            onChange={debouncedChangeTitle}
            placeholder="Title"
          />

          <Input
            className="text-md h-auto text-center"
            containerClassName="w-auto"
            type="text"
            ghost
            defaultValue={menu?.description || ""}
            onChange={debouncedChangeDescription}
            placeholder="Description"
          />

          <BlockList menuId={id} className="my-6" />

          <Input
            className="text-md h-auto text-center"
            containerClassName="w-auto"
            type="text"
            ghost
            defaultValue={menu?.footer || ""}
            onChange={debouncedChangeFooter}
            placeholder="Footer"
          />
        </div>
      </Loading>
    </div>
  );
};

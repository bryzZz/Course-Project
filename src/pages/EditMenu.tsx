/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ChangeEvent, useEffect, useMemo } from "react";

import debounce from "lodash.debounce";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { BlockList, MenuImage } from "components";
import { Input, Loading } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { MenuService } from "services/MenuService";
import { convertToBase64 } from "utils";

export const EditMenu: React.FC = () => {
  const id = useParams().id as string;

  const queryClient = useQueryClient();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id),
    queryFn: () => MenuService.get(id),
  });

  const update = useMutation({
    mutationFn: MenuService.update,
    onSettled: () => {
      queryClient.invalidateQueries(menuKeys.detail(id));
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
  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const image = await convertToBase64(e.target.files[0]);

    update.mutate({ [id]: { image } });
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
      debouncedChangeDescription.cancel();
      debouncedChangeFooter.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-main pb-12">
      <Loading loading={isLoading}>
        <div className="flex flex-col items-center pt-4">
          <MenuImage
            src={menu?.image ?? undefined}
            alt={menu?.title}
            onChange={handleChangeImage}
          />

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

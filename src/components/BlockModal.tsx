import React from "react";

import { Dish, Separator } from "components/BlockForms";
import { Block, BlockVariant, BlockForm } from "types";

import { Modal } from "./UI";

interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlockForm) => void;
  onDelete: () => void;

  blockVariant: BlockVariant;
  initialData: Block | null;
}

const formMap = {
  Dish,
  Separator,
};

export const BlockModal: React.FC<BlockModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  onDelete,
  blockVariant,
}) => {
  const handleSubmit = (data: BlockForm["data"]) => {
    onSubmit({ type: blockVariant, data } as BlockForm);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const FormComponent = formMap[blockVariant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Block">
      {/* Todo тут непонятно с типизацией */}
      <FormComponent
        onSubmit={handleSubmit}
        initialData={initialData as any}
        canDelete={!!initialData}
        onDelete={handleDelete}
      />
    </Modal>
  );
};

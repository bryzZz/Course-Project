import React from "react";

import * as forms from "components/BlockForms";
import { Block, BlockVariant, BlockForm } from "types";

import { Modal } from "./UI";

interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlockForm) => void;

  blockVariant: BlockVariant;
  initialData: Block | null;
}

const formMap = { ...forms };

export const BlockModal: React.FC<BlockModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  blockVariant,
}) => {
  const handleSubmit = (data: BlockForm["data"]) => {
    onSubmit({ type: blockVariant, data } as BlockForm);

    onClose();
  };

  const FormComponent = formMap[blockVariant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Block">
      {/* Todo тут непонятно с типизацией */}
      <FormComponent onSubmit={handleSubmit} initialData={initialData as any} />
    </Modal>
  );
};

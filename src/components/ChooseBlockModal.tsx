import React from "react";

import { BlockVariant } from "types";

import { Modal } from "./UI";

interface ChooseBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoose: (blockVariant: BlockVariant) => void;
}

export const ChooseBlockModal: React.FC<ChooseBlockModalProps> = ({
  isOpen,
  onClose,
  onChoose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose block">
      <button className="btn" type="button" onClick={() => onChoose("Dish")}>
        Dish
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => onChoose("Separator")}
      >
        Separator
      </button>
    </Modal>
  );
};

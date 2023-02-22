/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useId } from "react";

import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  return createPortal(
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal cursor-pointer items-start pt-40" onClick={onClose}>
        <div
          className="modal-box relative w-11/12 max-w-4xl cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button
              className="btn-sm btn-circle btn"
              type="button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

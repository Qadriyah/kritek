import React, { MouseEvent, PropsWithChildren } from "react";
import { GrClose } from "react-icons/gr";

export type ModalProps = {
  show: boolean;
  title?: string;
  onClose: () => void;
} & PropsWithChildren;

const Modal: React.FC<ModalProps> = ({ show, title, onClose, children }) => {
  if (!show) return null;

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "modalWrapper") {
      onClose();
    }
  };
  return (
    <div id="modalWrapper" onClick={handleClose} className="modal">
      <div className="modal-body">
        <div className="modal-header">
          <div style={{ flex: 1 }}>
            <h3>{title}</h3>
          </div>
          <GrClose
            role="button"
            onClick={() => onClose()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

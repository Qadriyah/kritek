import React from "react";
import Modal, { ModalProps } from "./Modal";
import Button from "../components/Button";

type IProps = ModalProps & {
  message: string;
  confirmDelete: () => void;
};

const ConfirmationModal: React.FC<IProps> = ({
  show,
  message,
  onClose,
  confirmDelete,
}) => {
  return (
    <Modal title="Delete Post" show={show} onClose={onClose}>
      <div>
        <div style={{ fontSize: "18px", marginBottom: "20px" }}>{message}</div>
        <div style={{ display: "flex", gap: 20 }}>
          <Button label="Cancel" className="button" onClick={onClose} />
          <Button
            label="Ok"
            className="button-danger"
            onClick={confirmDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

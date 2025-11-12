import BaseModal from "./BaseModal";

interface ConfirmModalProps {
  open: boolean;            // <-- add this
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onCancel(); // close modal after confirm
  };

  return (
    <BaseModal open={open} onClose={onCancel} variant="confirm">
      <p>{message}</p>
      <div className="btn-row">
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </BaseModal>
  );
}

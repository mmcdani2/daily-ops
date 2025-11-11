interface ConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="btn-row">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

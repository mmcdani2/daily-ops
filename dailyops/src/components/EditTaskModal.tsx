import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import type { Task } from "../types/task";

interface EditTaskModalProps {
  task: Task | null;
  onSave: (id: string, newText: string) => void;
  onClose: () => void;
}

export default function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [value, setValue] = useState(task?.text || "");

  // Ensure modal text updates if a different task is opened
  useEffect(() => {
    setValue(task?.text || "");
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(task.id, value);
    onClose();
  };

  return (
  <BaseModal open={!!task} onClose={onClose} title="Edit Task" variant="edit">
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
    />
    <div className="btn-row">
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  </BaseModal>
);
}

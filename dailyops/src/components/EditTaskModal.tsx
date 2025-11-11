import { useState } from "react"
import type { Task } from "../types/task"

interface EditTaskModalProps {
  task: Task | null
  onSave: (id: string, newText: string) => void
  onClose: () => void
}

export default function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [value, setValue] = useState(task?.text || "")
  if (!task) return null

  const handleSave = () => {
    if (!value.trim()) return
    onSave(task.id, value)
    onClose()
  }

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h3>Edit Task</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="btn-row">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}


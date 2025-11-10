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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ background: "#fff", padding: 20, width: 300, borderRadius: 4 }}>
        <h3>Edit Task</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 6 }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

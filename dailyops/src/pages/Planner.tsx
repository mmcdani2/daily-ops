import { useState, useEffect } from "react"
import { useTasks } from "../hooks/useTasks"
import { useNotes } from "../hooks/useNotes"
import { useSettings } from "../hooks/useSettings"
import EditTaskModal from "../components/EditTaskModal"
import ConfirmModal from "../components/ConfirmModal"
import SettingsModal from "../components/SettingsModal"
import type { Task } from "../types/task"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const categories: Task["category"][] = ["Ops", "Admin", "Field", "Finance"]

export default function Planner() {
  const { tasks, loading, addTask, toggleTask, editTask } = useTasks()
  const { notes, loading: notesLoading, saveNotes } = useNotes()
  const { settings, loading: settingsLoading, setTheme } = useSettings()

  const [text, setText] = useState("")
  const [day, setDay] = useState("Sunday")
  const [category, setCategory] = useState<Task["category"]>("Ops")
  const [filter, setFilter] = useState<"All" | Task["category"]>("All")
  const [showTodayOnly, setShowTodayOnly] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToClear, setTaskToClear] = useState<Task | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (!settingsLoading) document.body.className = `theme-${settings.theme}`
  }, [settings.theme, settingsLoading])

  if (loading || notesLoading || settingsLoading) return <p>Loading...</p>

  return (
    <div className="planner">
      {/* === CONTROLS === */}
      <section className="planner-controls">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task"
        />
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as Task["category"])}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={() => { if (text.trim()) { addTask(text, day, category); setText(""); } }}>
          Add
        </button>
        <button onClick={() => { if (text.trim()) { addTask(text, days[new Date().getDay()], category); setText(""); } }}>
          Quick Add to Today
        </button>
      </section>

      {/* === FILTERS === */}
      <section className="planner-filters">
        <label>Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "All" | Task["category"])}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={showTodayOnly}
            onChange={() => setShowTodayOnly(!showTodayOnly)}
          />{" "}
          Show Today Only
        </label>
      </section>

      {/* === TASKS === */}
      <section className="planner-content">
        {days
          .filter((d) => !showTodayOnly || d === days[new Date().getDay()])
          .map((d) => (
            <div key={d} className="planner-section">
              <h3>{d}</h3>
              <table className="planner-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks
                    .filter((t) => t.day === d && (filter === "All" || t.category === filter))
                    .map((t) => (
                      <tr key={t.id}>
                        <td style={{ textDecoration: t.done ? "line-through" : "none" }}>
                          {t.text}
                        </td>
                        <td>{t.category}</td>
                        <td>{t.done ? "✅ Done" : "⏳ Pending"}</td>
                        <td className="action-cell">
                          <button onClick={() => setTaskToClear(t)} className="btn-complete">
                            Complete
                          </button>
                          <button onClick={() => setEditingTask(t)} className="btn-edit">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
      </section>

      {/* === NOTES === */}
      <section className="planner-notes">
        <h3>Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => saveNotes(e.target.value)}
          placeholder="General notes for the week..."
        />
      </section>

      {/* === MODALS === */}
      <EditTaskModal task={editingTask} onSave={(id, newText) => { editTask(id, newText); setEditingTask(null); }} onClose={() => setEditingTask(null)} />
      {taskToClear && (
        <ConfirmModal
          message={`Mark "${taskToClear.text}" as complete and remove it?`}
          onConfirm={() => { toggleTask(taskToClear.id); setTaskToClear(null); }}
          onCancel={() => setTaskToClear(null)}
        />
      )}
      <SettingsModal open={settingsOpen} currentTheme={settings.theme} onChangeTheme={setTheme} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

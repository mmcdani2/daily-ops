import { useState, useEffect } from "react"
import { useTasks } from "../hooks/useTasks"
import { useNotes } from "../hooks/useNotes"
import { useSettings } from "../hooks/useSettings"
import EditTaskModal from "../components/EditTaskModal"
import ConfirmModal from "../components/ConfirmModal"
import SettingsModal from "../components/SettingsModal"
import { Settings as SettingsIcon } from "lucide-react"
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
    if (!settingsLoading) {
      document.body.className = `theme-${settings.theme}`
    }
  }, [settings.theme, settingsLoading])

  if (loading || notesLoading || settingsLoading) return <p>Loading...</p>

  const handleAdd = () => {
    if (!text.trim()) return
    addTask(text, day, category)
    setText("")
  }

  const handleQuickAddToday = () => {
    if (!text.trim()) return
    const today = days[new Date().getDay()]
    addTask(text, today, category)
    setText("")
  }

  const handleSaveEdit = (id: string, newText: string) => {
    editTask(id, newText)
    setEditingTask(null)
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="planner-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>DailyOps</h1>
        <button onClick={() => setSettingsOpen(true)} title="Settings" className="settings-btn">
          <SettingsIcon size={22} />
        </button>
      </div>

      {/* Controls */}
      <div className="planner-controls" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task"
          style={{ flex: "1 1 200px", padding: 6 }}
        />
        <select value={day} onChange={(e) => setDay(e.target.value)} style={{ padding: 6 }}>
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Task["category"])}
          style={{ padding: 6 }}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleQuickAddToday}>Quick Add to Today</button>
      </div>

      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <label>Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "All" | Task["category"])}
          style={{ padding: 6 }}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={showTodayOnly}
            onChange={() => setShowTodayOnly(!showTodayOnly)}
          />
          Show Today Only
        </label>
      </div>

      {/* Task Lists */}
      {days
        .filter((d) => !showTodayOnly || d === days[new Date().getDay()])
        .map((d) => (
          <div key={d} className="planner-section" style={{ marginBottom: 20 }}>
            <h3>{d}</h3>
            <ul className="planner-list" style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {tasks
                .filter((t) => t.day === d && (filter === "All" || t.category === filter))
                .map((t) => (
                  <li
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                      padding: "2px 0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => setTaskToClear(t)}
                      />
                      <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                        {t.text}
                      </span>
                      {t.category && (
                        <span style={{ fontSize: "12px", color: "#555" }}>
                          [{t.category}]
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setEditingTask(t)}
                      className="edit-btn"
                      style={{ marginLeft: 10 }}
                    >
                      Edit
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}

      {/* Notes */}
      <div className="planner-notes" style={{ marginTop: 40 }}>
        <h3>Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => saveNotes(e.target.value)}
          placeholder="General notes for the week..."
          style={{
            width: "100%",
            minHeight: 150,
            padding: 8,
            fontFamily: "inherit",
            fontSize: 14,
          }}
        />
      </div>

      {/* Modals */}
      <EditTaskModal
        task={editingTask}
        onSave={handleSaveEdit}
        onClose={() => setEditingTask(null)}
      />

      {taskToClear && (
        <ConfirmModal
          message={`Mark "${taskToClear.text}" as complete and remove it?`}
          onConfirm={() => {
            toggleTask(taskToClear.id)
            setTaskToClear(null)
          }}
          onCancel={() => setTaskToClear(null)}
        />
      )}

      <SettingsModal
        open={settingsOpen}
        currentTheme={settings.theme}
        onChangeTheme={setTheme}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  )
}

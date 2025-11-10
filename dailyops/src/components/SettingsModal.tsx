import type { Theme } from "../hooks/useSettings"

interface SettingsModalProps {
  open: boolean
  currentTheme: Theme
  onChangeTheme: (theme: Theme) => void
  onClose: () => void
}

export default function SettingsModal({ open, currentTheme, onChangeTheme, onClose }: SettingsModalProps) {
  if (!open) return null

  const themes: Theme[] = ["default", "modern", "ms95", "mxp", "system7", "dos"]


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
        <h3>Settings</h3>
        <label style={{ display: "block", marginBottom: 8 }}>Theme</label>
        <select
          value={currentTheme}
          onChange={(e) => onChangeTheme(e.target.value as Theme)}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

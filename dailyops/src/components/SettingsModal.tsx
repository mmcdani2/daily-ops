import type { Theme } from "../hooks/useSettings"

interface SettingsModalProps {
  open: boolean
  currentTheme: Theme
  onChangeTheme: (theme: Theme) => void
  onClose: () => void
}

export default function SettingsModal({
  open,
  currentTheme,
  onChangeTheme,
  onClose,
}: SettingsModalProps) {
  if (!open) return null

  const themes: Theme[] = ["default", "modern", "ms95", "mxp", "system7", "dos"]

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <h3>Settings</h3>
        <label>Theme</label>
        <select
          value={currentTheme}
          onChange={(e) => onChangeTheme(e.target.value as Theme)}
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


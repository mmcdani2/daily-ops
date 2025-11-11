import { useState, useEffect } from "react"
import Planner from "./pages/Planner"
import { useSettings } from "./hooks/useSettings"
import SettingsModal from "./components/SettingsModal"

export default function App() {
  const { settings, loading, setTheme } = useSettings()
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (!loading) document.body.className = `theme-${settings.theme}`
  }, [settings.theme, loading])

  if (loading) return <p>Loading...</p>

  return (
    <div className="page-shell">
      {/* ===== HEADER ===== */}
      <header className="masthead">
        <div className="masthead-logo">DailyOps</div>
        <div className="masthead-toolbar">
          <button className="toolbar-btn">My Account</button>
          <button
            className="toolbar-btn settings-btn"
            onClick={() => setSettingsOpen(true)}
          >
            Settings
          </button>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <div className="content-row">
        <nav className="left-rail">
          <p><strong>Navigation</strong></p>
          <ul>
            <li>Dashboard</li>
            <li>Planner</li>
            <li>Reports</li>
          </ul>
        </nav>

        <main className="main-column">
          <Planner settings={settings} setTheme={setTheme} />
        </main>

        <aside className="right-rail">
          <p><strong>Quick Notes</strong></p>
          <p>Use this area for reminders or a ticker banner.</p>
        </aside>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        © 2001 DailyOps Corp. All rights reserved.
      </footer>

      {/* ===== SETTINGS MODAL ===== */}
      <SettingsModal
        open={settingsOpen}
        currentTheme={settings.theme}
        onChangeTheme={setTheme}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  )
}

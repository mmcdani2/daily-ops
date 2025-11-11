import { useState } from "react";
import Planner from "./pages/Planner";
import SettingsModal from "./components/SettingsModal";
import { useSettingsContext } from "./context/SettingsContext";

export default function App() {
  const { settings, setTheme } = useSettingsContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

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
        onClose={() => setSettingsOpen(false)}
      />

    </div>
  );
}

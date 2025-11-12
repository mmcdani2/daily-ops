import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { THEMES, useSettingsContext } from "../context/SettingsContext";

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { settings, setTheme } = useSettingsContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <BaseModal open={open} onClose={onClose} title="Settings">
      <label htmlFor="theme-select">Theme</label>

      {isMobile ? (
        // === Scroll wheel for mobile ===
        <div className="wheel-container">
          {THEMES.map((t) => (
            <div
              key={t}
              className={`wheel-option ${
                settings.theme === t ? "active" : ""
              }`}
              onClick={() => setTheme(t)}
            >
              {t.toUpperCase()}
            </div>
          ))}
        </div>
      ) : (
        // === Native select for desktop ===
        <select
          id="theme-select"
          value={settings.theme}
          onChange={(e) =>
            setTheme(e.target.value as typeof THEMES[number])
          }
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>
      )}

      <button onClick={onClose}>Close</button>
    </BaseModal>
  );
}

// /src/components/SettingsModal.tsx
import BaseModal from "./BaseModal";
import { THEMES, useSettingsContext } from "../context/SettingsContext";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { settings, setTheme } = useSettingsContext();

  return (
    <BaseModal open={open} onClose={onClose} title="Settings">
      <label htmlFor="theme-select">Theme</label>
      <select
        id="theme-select"
        value={settings.theme}
        onChange={(e) => setTheme(e.target.value as typeof THEMES[number])}
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t.toUpperCase()}
          </option>
        ))}
      </select>

      <button onClick={onClose}>Close</button>
    </BaseModal>
  );
}

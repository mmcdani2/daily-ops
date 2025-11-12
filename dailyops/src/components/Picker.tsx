import { useEffect, useState } from "react";
import type { Theme } from "../hooks/useSettings";

interface PickerProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export default function Picker({ label, options, value, onChange }: PickerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
  }, []);

  if (!isMobile) {
    // === Desktop: use classic select ===
    return (
      <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {label}
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  // === Mobile: scroll wheel picker ===
  return (
    <div className="wheel-picker">
      <label>{label}</label>
      <div className="wheel-container">
        {options.map((opt) => (
          <div
            key={opt}
            className={`wheel-option ${opt === value ? "active" : ""}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

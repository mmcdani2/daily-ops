import { useState, useEffect } from "react"
import { get, set } from "idb-keyval"

const SETTINGS_KEY = "dailyops-settings"

export type Theme = "default" | "modern" | "ms95" | "xp" | "system7" | "dos"

interface Settings {
  theme: Theme
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({ theme: "default" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get(SETTINGS_KEY).then((stored) => {
      if (stored) setSettings(stored)
      setLoading(false)
    })
  }, [])

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings)
    set(SETTINGS_KEY, newSettings)
  }

  const setTheme = (theme: Theme) => saveSettings({ ...settings, theme })

  return { settings, loading, setTheme }
}

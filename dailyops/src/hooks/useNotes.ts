import { useState, useEffect } from "react"
import { get, set } from "idb-keyval"

const NOTES_KEY = "dailyops-notes"

export function useNotes() {
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get(NOTES_KEY).then((stored) => {
      setNotes(stored || "")
      setLoading(false)
    })
  }, [])

  const saveNotes = (value: string) => {
    setNotes(value)
    set(NOTES_KEY, value) 
  }

  return { notes, loading, saveNotes }
}

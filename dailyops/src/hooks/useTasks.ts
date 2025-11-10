import { useState, useEffect } from "react"
import { getTasks, saveTasks } from "../lib/db"
import type { Task } from "../types/task"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTasks().then((stored) => {
            setTasks(stored)
            setLoading(false)
        })
    }, [])

    const persist = (updated: Task[]) => {
        setTasks(updated)
        saveTasks(updated)
    }

    const addTask = (text: string, day: string, category?: Task["category"]) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            text,
            day,
            category,
            done: false,
            createdAt: Date.now(),
        }
        persist([...tasks, newTask])
    }

    const toggleTask = (id: string) => {
        const task = tasks.find((t) => t.id === id)
        if (!task) return

        // Just remove immediately; Planner handles confirmation UI
        if (!task.done) {
            persist(tasks.filter((t) => t.id !== id))
        } else {
            persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
        }
    }




    const deleteTask = (id: string) => {
        persist(tasks.filter((t) => t.id !== id))
    }

    const editTask = (id: string, newText: string) => {
        persist(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)))
    }

    return { tasks, loading, addTask, toggleTask, deleteTask, editTask }
}

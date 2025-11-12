import { useState, useEffect } from "react";
import { getTasks, saveTasks } from "../lib/db";
import type { Task } from "../types/task";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTasks().then((stored) => {
            setTasks(stored);
            setLoading(false);
        });
    }, []);

    const persist = (updated: Task[]) => {
        setTasks(updated);
        saveTasks(updated);
    };

    // Add a new task
    const addTask = (text: string, day: string, category?: Task["category"]) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            text,
            day,
            category,
            done: false,
            createdAt: Date.now(),
        };
        persist([...tasks, newTask]);
    };

    // Mark a task as complete (one-directional)
    const completeTask = (id: string) => {
        persist(
            tasks.map((t) =>
                t.id === id ? { ...t, done: !t.done } : t
            )
        );
    };


    // Delete task permanently
    const deleteTask = (id: string) => {
        persist(tasks.filter((t) => t.id !== id));
    };

    // Edit an existing task
    const editTask = (id: string, newText: string) => {
        persist(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    };

    return {
        tasks,
        loading,
        addTask,
        completeTask,
        deleteTask,
        editTask,
    };
}

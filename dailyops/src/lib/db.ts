import { get, set, del } from "idb-keyval"
import type { Task } from "../types/task"

const STORAGE_KEY = "dailyops-tasks"

export async function getTasks(): Promise<Task[]> {
  return (await get(STORAGE_KEY)) || []
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await set(STORAGE_KEY, tasks)
}

export async function clearTasks(): Promise<void> {
  await del(STORAGE_KEY)
}

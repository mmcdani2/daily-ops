export interface Task {
  id: string
  text: string
  day: string
  done: boolean
  createdAt: number
  category?: "Ops" | "Admin" | "Field" | "Finance"
}


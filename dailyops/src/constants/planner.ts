import type { Task } from "../types/task";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const CATEGORIES: Task["category"][] = ["Ops", "Admin", "Field", "Finance"];

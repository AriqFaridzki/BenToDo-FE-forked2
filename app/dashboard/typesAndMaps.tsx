
// CUSTOM DATA TYPES
import type { EnergyWeight, Task, TaskStatus, TaskTemplate } from "../lib/api";
import { formatDate } from "../lib/utils";


export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export type MenuOption = "dashboard" | "task" | "template";
export type TemplateViewOption = "list" | "detail" | "create" | "success";


export type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";

export type ViewTask = {
  id?: string;
  title: string;
  level: PriorityLevel;
  subtask: string;
  date: string;
  done?: boolean;
  status?: TaskStatus;
};

export type ChartRange = "week" | "month" | "year"; // custom type for chart range

export type ViewCard = {
  id: number;
  backendKey?: string;
  taskId?: string;
  title: string;
  desc: string;
  level: string;
  subtasks: number;
  type: string[];
  previewItems?: TaskTemplate["preview_items"];
};

export const mapEnergyToLevel = (energyWeight: EnergyWeight): PriorityLevel => {
  if (energyWeight === "Berat") return "HIGH";
  if (energyWeight === "Sedang") return "MEDIUM";
  return "LOW";
};


export const mapTaskToViewTask = (task: Task): ViewTask => ({
  id: task.id,
  title: task.title,
  level: mapEnergyToLevel(task.energy_weight),
  subtask: task.source_template ? `Template: ${task.source_template}` : task.status,
  date: formatDate(task.deadline),
  done: task.status === "done",
  status: task.status,
});

export const mapTemplateToCard = (template: TaskTemplate, index: number): ViewCard => ({
  id: index + 1,
  backendKey: template.key,
  title: template.name,
  desc: template.description,
  level: "OFFICIAL",
  subtasks: template.total_items,
  type: ["All", "Public"],
  previewItems: template.preview_items,
});

export const mapTaskToCard = (task: Task, index: number): ViewCard => ({
  id: index + 1,
  taskId: task.id,
  title: task.title,
  desc: task.source_template
    ? `Task dari template ${task.source_template}`
    : `Status: ${task.status.replace("_", " ")}`,
  level: mapEnergyToLevel(task.energy_weight),
  subtasks: task.used_timer ? task.timer_duration ?? 0 : 0,
  type: ["All", task.status === "done" ? "Public" : "Private"],
});


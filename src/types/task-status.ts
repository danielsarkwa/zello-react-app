import { z } from "zod"

export enum TaskStatusEnum {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2
}

export const TASK_STATUS_OPTIONS = [
  { value: TaskStatusEnum.NotStarted, label: "Not Started" },
  { value: TaskStatusEnum.InProgress, label: "In Progress" },
  { value: TaskStatusEnum.Completed, label: "Completed" }
]

export const statusToEnum: Record<string, number> = {
  'NotStarted': TaskStatusEnum.NotStarted,
  'InProgress': TaskStatusEnum.InProgress,
  'Completed': TaskStatusEnum.Completed
}

export const TaskStatus = z.nativeEnum(TaskStatusEnum)

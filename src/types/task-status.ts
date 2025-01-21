import { z } from "zod"

export enum TaskStatusEnum {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed"
}

export const TaskStatus = z.nativeEnum(TaskStatusEnum)

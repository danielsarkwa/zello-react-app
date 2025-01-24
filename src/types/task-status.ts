import { z } from "zod"

export enum TaskStatusEnum {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2
}

export const TaskStatus = z.nativeEnum(TaskStatusEnum)

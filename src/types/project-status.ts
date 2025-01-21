import { z } from "zod"

export enum ProjectStatusEnum {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed"
}

export const ProjectStatus = z.nativeEnum(ProjectStatusEnum)

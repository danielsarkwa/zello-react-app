import { z } from "zod"

export const getStatusText = (status: ProjectStatusEnum): string => {
  const statusMap = {
    [ProjectStatusEnum.NotStarted]: "Not Started",
    [ProjectStatusEnum.InProgress]: "In Progress",
    [ProjectStatusEnum.Completed]: "Completed"
  }
  return statusMap[status]
}

export enum ProjectStatusEnum {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2
}

export const PROJECT_STATUS_OPTIONS = [
  { value: ProjectStatusEnum.NotStarted, label: "Not Started" },
  { value: ProjectStatusEnum.InProgress, label: "In Progress" },
  { value: ProjectStatusEnum.Completed, label: "Completed" }
]

export const ProjectStatus = z.nativeEnum(ProjectStatusEnum)

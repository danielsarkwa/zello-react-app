import { z } from "zod"

export enum PriorityEnum {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}

export const PRIORITY_OPTIONS = [
  { value: PriorityEnum.Low, label: "Low" },
  { value: PriorityEnum.Medium, label: "Medium" },
  { value: PriorityEnum.High, label: "High" },
  { value: PriorityEnum.Urgent, label: "Urgent" }
]

export const priorityToEnum: Record<string, number> = {
  Low: PriorityEnum.Low,
  Medium: PriorityEnum.Medium,
  High: PriorityEnum.High,
  Critical: PriorityEnum.Urgent
}

export const Priority = z.nativeEnum(PriorityEnum)

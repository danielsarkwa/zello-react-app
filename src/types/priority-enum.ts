import { z } from "zod"

export enum PriorityEnum {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Urgent = "Urgent"
}

export const Priority = z.nativeEnum(PriorityEnum)

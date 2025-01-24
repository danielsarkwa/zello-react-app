import { z } from "zod"

export enum PriorityEnum {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}

export const Priority = z.nativeEnum(PriorityEnum)

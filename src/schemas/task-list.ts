import { z } from "zod"

// Base schema
export const taskListSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string().min(1).max(100),
  position: z.number().int().min(0),
  createdDate: z.string().datetime()
})

export const TaskListWithDetailsSchema = taskListSchema.extend({
  tasks: z.lazy(() => z.array(taskSchema)).optional(),
})

export const TaskListResponseSchema = z.array(TaskListWithDetailsSchema).default([])

// operation schemas
export const createListSchema = taskListSchema.omit({
  id: true,
  projectId: true,
  position: true,
  createdDate: true
})

import { taskSchema } from "@/schemas/tasks"

export type TaskList = z.infer<typeof taskListSchema>
export type TaskListWithDetails = z.infer<typeof TaskListWithDetailsSchema>
export type CreateListValues = z.infer<typeof createListSchema>

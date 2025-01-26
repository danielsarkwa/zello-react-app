import { z } from "zod"
import { TaskStatus } from "@/types/task-status"
import { Priority } from "@/types/priority-enum"

// Base schema
export const taskSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(3).max(500),
  status: TaskStatus.optional(),
  priority: Priority.optional(),
  deadline: z.string().datetime().optional(),
  projectId: z.string().uuid().optional(),
  listId: z.string().uuid(),
  createdDate: z.string().datetime()
})

export const TaskWithDetailsSchema = taskSchema.extend({
  project: z.lazy(() => projectSchema.optional()),
  list: z.lazy(() => taskListSchema.optional()),
  assignees: z.lazy(() => z.array(userSchema).optional()),
  comments: z.lazy(() => z.array(commentSchema).optional())
})

// operation schemas
export const createTaskSchema = taskSchema.omit({
  id: true,
  projectId: true,
  listId: true,
  deadline: true,
  createdDate: true
})

import { projectSchema } from "@/schemas/project"
import { taskListSchema } from "@/schemas/task-list"
import { userSchema } from "@/schemas/user"
import { commentSchema } from "@/schemas/comment"

export type Task = z.infer<typeof taskSchema>
export type TaskWithDetails = z.infer<typeof TaskWithDetailsSchema>
export type CreateTaskValues = z.infer<typeof createTaskSchema>

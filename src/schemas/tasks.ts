import { z } from "zod"
import { TaskStatus } from "@/types/task-status"
import { Priority } from "@/types/priority-enum"

export const taskSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: TaskStatus,
  priority: Priority,
  deadline: z.string().datetime().optional(),
  projectId: z.string().uuid(),
  listId: z.string().uuid(),
  createdDate: z.string().datetime()
})

export const TaskWithDetailsSchema = taskSchema.extend({
  project: z.lazy(() => projectSchema.optional()),
  list: z.lazy(() => taskListSchema.optional()),
  assignees: z.lazy(() => z.array(userSchema).optional()),
  comments: z.lazy(() => z.array(commentSchema).optional())
})

import { projectSchema } from "@/schemas/project"
import { taskListSchema } from "@/schemas/task-list"
import { userSchema } from "@/schemas/user"
import { commentSchema } from "@/schemas/comment"

export type Task = z.infer<typeof taskSchema>

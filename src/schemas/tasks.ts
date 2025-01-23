import { z } from "zod"
import { TaskStatus } from "@/types/task-status"
import { Priority } from "@/types/priority-enum"

import { projectSchema } from "@/schemas/project"
import { taskListSchema } from "@/schemas/task-list"
import { userSchema } from "@/schemas/user"
import { commentSchema } from "@/schemas/comment"

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
  project: projectSchema.optional(),
  list: taskListSchema.optional(),
  assignees: z.array(userSchema).optional(),
  comments: z.array(commentSchema).optional()
})

export type Task = z.infer<typeof taskSchema>

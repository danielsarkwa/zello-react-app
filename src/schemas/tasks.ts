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

// Add taskList, project, Assignees, Comments

export type Task = z.infer<typeof taskSchema>

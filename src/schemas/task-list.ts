import { z } from "zod"

export const taskListSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string().min(1).max(100),
  position: z.number().int().min(0),
  createdDate: z.string().datetime()
})

export const TaskListWithTasksSchema = taskListSchema.extend({
  tasks: z.array(taskListSchema).optional()
})

export type TaskList = z.infer<typeof taskListSchema>

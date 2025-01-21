import { z } from "zod"

export const commentSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  userId: z.string().uuid(),
  content: z.string().min(1).max(500),
  createdDate: z.string().datetime()
})

// add task and user to the comment schema

export type Comment = z.infer<typeof commentSchema>

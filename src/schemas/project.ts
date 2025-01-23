import { z } from "zod"
import { ProjectStatus } from "@/types/project-status"

export const projectSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: ProjectStatus,
  createdDate: z.string().datetime()
})

export const ProjectWithDetailsSchema = projectSchema.extend({
  workspace: z.lazy(() => workspaceSchema).optional(),
  lists: z.lazy(() => z.array(taskListSchema)).optional(),
  members: z.lazy(() => z.array(workspaceMemberSchema)).optional()
})

import { workspaceSchema } from "@/schemas/workspace"
import { taskListSchema } from "@/schemas/task-list"
import { workspaceMemberSchema } from "@/schemas/workspace-member"

export type Project = z.infer<typeof projectSchema>

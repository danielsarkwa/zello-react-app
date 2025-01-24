import { z } from "zod"
import { ProjectStatus } from "@/types/project-status"

// Base schema
export const projectSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: ProjectStatus,
  createdDate: z.string().datetime()
})

export const ProjectWithDetailsSchema = projectSchema.extend({
  lists: z.lazy(() => z.array(taskListSchema)).optional(),
  members: z.lazy(() => z.array(workspaceMemberSchema)).optional()
})

export const ProjectResponseSchema = z.array(ProjectWithDetailsSchema).default([])

// operation schemas
export const createProjectSchema = projectSchema.omit({
  id: true,
  createdDate: true,
  startDate: true,
  endDate: true
})

export const createProjectFormSchema = createProjectSchema.pick({
  name: true,
  description: true
})

import { taskListSchema } from "@/schemas/task-list"
import { workspaceMemberSchema } from "@/schemas/workspace-member"

export type Project = z.infer<typeof projectSchema>
export type ProjectWithDetails = z.infer<typeof ProjectWithDetailsSchema>
export type CreateProjectValues = z.infer<typeof createProjectSchema>

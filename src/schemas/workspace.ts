import { z } from "zod"

// basic schema
export const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  ownerId: z.string().uuid(),
  createdDate: z.string().datetime()
})

export const WorkspaceWithDetailsSchema = workspaceSchema.extend({
  projects: z.lazy(() => z.array(projectSchema)).default([]),
  members: z.lazy(() => z.array(workspaceMemberSchema)).default([])
})

export const WorkspaceResponseSchema = z.array(WorkspaceWithDetailsSchema).default([])

// operational schema
export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100)
})

// imports are below to avoid circular dependencies
import { workspaceMemberSchema } from "@/schemas/workspace-member"
import { projectSchema } from "@/schemas/project"

export type Workspace = z.infer<typeof workspaceSchema>
export type WorkspaceWithDetails = z.infer<typeof WorkspaceWithDetailsSchema>
export type CreateWorkspaceValues = z.infer<typeof createWorkspaceSchema>

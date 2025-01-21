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

// add Workspace, Members, and Tasks to the project schema

export type Project = z.infer<typeof projectSchema>

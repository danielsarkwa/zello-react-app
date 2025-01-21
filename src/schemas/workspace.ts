import { z } from "zod"

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  ownerId: z.string().uuid(),
  createdDate: z.string().datetime()
})
// add projects and members to the workspace schema

// export const workspaceReponseSchema = z.array(workspaceSchema)

export type Workspace = z.infer<typeof workspaceSchema>

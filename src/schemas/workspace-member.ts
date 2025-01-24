import { z } from "zod"
import { AccessLevelString } from "@/types/access-level"

export const workspaceMemberSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  accessLevel: AccessLevelString,
  createdDate: z.string().datetime()
})

export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>

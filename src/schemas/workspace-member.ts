import { z } from "zod"
import { AccessLevel } from "@/types/access-level"

export const workspaceMemberSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  accessLevel: AccessLevel,
  createdDate: z.string().datetime()
})

export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>

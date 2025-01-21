import { z } from "zod"
import { AccessLevel } from "@/types/access-level"

export const projectMemberSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  workspaceMemberId: z.string().uuid(),
  accessLevel: AccessLevel,
  createdDate: z.string().datetime()
})
// add Project, WorkspaceMember

export type ProjectMember = z.infer<typeof projectMemberSchema>

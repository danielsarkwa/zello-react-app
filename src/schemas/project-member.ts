import { z } from "zod"
import { AccessLevel } from "@/types/access-level"
import { workspaceMemberSchema } from "@/schemas/workspace-member"

export const projectMemberSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  workspaceMemberId: z.string().uuid(),
  accessLevel: AccessLevel,
  createdDate: z.string().datetime()
})

export const ProjectMemberWithDetailsSchema = projectMemberSchema.extend({
  workspaceMember: workspaceMemberSchema.optional()
})

export type ProjectMember = z.infer<typeof projectMemberSchema>

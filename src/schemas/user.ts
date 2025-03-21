import { z } from "zod"
import { AccessLevelString } from "@/types/access-level"

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1).max(30),
  name: z.string().min(1).max(30),
  email: z.string().email().max(100),
  createdDate: z.string().datetime(),
  accessLevel: AccessLevelString
})

export type User = z.infer<typeof userSchema>

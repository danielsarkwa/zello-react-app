import { z } from "zod"
import { AccessLevelNumeric, AccessLevelString } from "@/types/access-level"

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  password: z.string()
})

export const loginResponseSchema = z.object({
  token: z.string(),
  expires: z.string().datetime(),
  tokenType: z.literal("Bearer"),
  accessLevel: AccessLevelString,
  numericLevel: AccessLevelNumeric,
  description: z.string()
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>

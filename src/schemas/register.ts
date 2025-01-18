"use client"

import { AccessLevel } from "@/types/accessLevel"
import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  userName: z.string().min(1, "Username is required").max(30),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email must not exceed 100 characters")
    .refine((email) => {
      // Basic email regex pattern
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      // Additional checks
      return (
        emailRegex.test(email) &&
        !email.includes("..") && // No consecutive dots
        email.indexOf("@") === email.lastIndexOf("@") && // Single @ symbol
        !email.startsWith(".") && // Doesn't start with a dot
        !email.endsWith(".") && // Doesn't end with a dot
        email.indexOf("@") > 0 && // @ not at start
        email.indexOf("@") < email.length - 1 // @ not at end
      )
    }, "Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
  accessLevel: z.nativeEnum(AccessLevel).default(AccessLevel.Member)
})

export type RegisterFormValues = z.infer<typeof registerSchema>

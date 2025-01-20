import { z } from "zod"

export enum AccessLevelEnum {
  Admin = "Admin",
  Member = "Member",
  Owner = "Owner",
  Guest = "Guest"
}

export const AccessLevel = z.nativeEnum(AccessLevelEnum)

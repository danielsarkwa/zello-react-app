import { z } from "zod"

export enum AccessLevelNumericEnum {
  Guest = 0,
  Member = 10,
  Owner = 20,
  Admin = 30
}

export enum AccessLevelStringEnum {
  Guest = "Guest",
  Member = "Member",
  Owner = "Owner",
  Admin = "Admin"
}

export const AccessLevelNumeric = z.nativeEnum(AccessLevelNumericEnum)
export const AccessLevelString = z.nativeEnum(AccessLevelStringEnum)

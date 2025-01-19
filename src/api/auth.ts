import api from "./index"
import { User, userSchema } from "@/schemas/user"
import { RegisterFormValues } from "@/schemas/register"

export const registerUser = async (data: RegisterFormValues): Promise<User> => {
  const response = await api.post("/register", data)
  const validatedUser = userSchema.safeParse(response.data)

  console.log("validated user", validatedUser)

  if (!validatedUser.success) {
    throw new Error("Invalid response from server")
  }

  return validatedUser.data
}

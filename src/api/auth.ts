import api from "./index"
import { User, userSchema } from "@/schemas/user"
import { RegisterFormValues } from "@/schemas/register"

const transformApiResponse = (data: any) => {
  return {
    ...data,
    createdDate: data.created_date,
    accessLevel: data.access_level
  }
}

const register = async (data: RegisterFormValues): Promise<User> => {
  const response = await api.post("/user/register", data)

  const transformedData = transformApiResponse(response.data)
  const validatedUser = userSchema.safeParse(transformedData)

  if (!validatedUser.success) {
    throw validatedUser.error
  }

  return validatedUser.data
}

const login = () => {
  console.log("login")
}

const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/user/me")

  const transformedData = transformApiResponse(response.data)
  const validatedUser = userSchema.safeParse(transformedData)

  if (!validatedUser.success) {
    throw validatedUser.error
  }

  return validatedUser.data
}

const AuthService = {
  register,
  login,
  getCurrentUser
}

export default AuthService

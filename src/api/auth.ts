import api from "."
import { User, userSchema } from "@/schemas/user"
import { RegisterFormValues } from "@/schemas/register"
import {
  LoginFormValues,
  LoginResponse,
  loginResponseSchema
} from "@/schemas/login"

const register = async (data: RegisterFormValues): Promise<User> => {
  const response = await api.post("/user/register", data)

  const transformedData = {
    ...response.data,
    createdDate: response.data.created_date,
    accessLevel: response.data.access_level
  }

  const validatedUser = userSchema.safeParse(transformedData)

  if (!validatedUser.success) {
    throw validatedUser.error
  }

  return validatedUser.data
}

const login = async (data: LoginFormValues): Promise<LoginResponse> => {
  const response = await api.post("/user/login", data)

  const transformedData = {
    ...response.data,
    tokenType: response.data.token_type,
    accessLevel: response.data.access_level,
    numericLevel: response.data.numeric_level
  }

  const validatedResponse = loginResponseSchema.safeParse(transformedData)

  if (!validatedResponse.success) {
    throw validatedResponse.error
  }

  return validatedResponse.data
}

const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/user/me")

  const transformedData = {
    ...response.data,
    createdDate: response.data.created_date,
    accessLevel: response.data.access_level
  }

  const validatedUser = userSchema.safeParse(transformedData)

  if (!validatedUser.success) {
    throw validatedUser.error
  }

  return validatedUser.data
}

const AuthService = {
  register,
  login,
  getCurrentUser,
}

export default AuthService

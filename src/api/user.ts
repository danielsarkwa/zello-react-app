import api from "."
import { User, userSchema } from "@/schemas/user"

const getUserProfile = async (userId: string): Promise<User> => {
  const response = await api.get(`/user/${userId}`)

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

const UserService = {
  getUserProfile
}

export default UserService

import { useMutation } from "@tanstack/react-query"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { StandardError } from "@/types/standard-error"
import UserService from "@/api/user"

export const getUserProfile = () => {
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: UserService.getUserProfile,
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}

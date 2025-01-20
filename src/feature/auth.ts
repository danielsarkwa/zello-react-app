import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import AuthService from "@/api/auth"
import { useErrorHandler } from "@/hooks/useErrorHandler"
import { StandardError } from "@/types/standard-error"
import { User } from "@/schemas/user"
import { useToast } from "@/hooks/use-toast"
// import { useAuthStore } from "@/store/auth"

export const registerUser = () => {
  const handleError = useErrorHandler()
  const navigate = useNavigate()
  const { toast } = useToast()

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (response: User) => {
      toast({
        title: "Registration Successful",
        description: "Redirecting you to login page...",
        className: "bg-green-500 text-white border-green-500"
      })
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    },
    onError: (error: StandardError) =>
      handleError(error, {
        validation: "Invalid Registration Details",
        409: "This email or username is already taken"
      })
  })
}

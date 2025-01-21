import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router"
import AuthService from "@/api/auth"
import { useErrorHandler } from "@/hooks/useErrorHandler"
import { StandardError } from "@/types/standard-error"
import { User } from "@/schemas/user"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/auth"

export const registerUser = () => {
  const handleError = useErrorHandler()
  const navigate = useNavigate()
  const { toast } = useToast()

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Redirecting you to login page...",
        className: "bg-green-500 text-white border-green-500",
        duration: 6000
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

export const loginUser = () => {
  const handleError = useErrorHandler()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      setAuth(response)
      toast({
        title: "Login Successful",
        description: "Redirecting you to dashboard...",
        className: "bg-green-500 text-white border-green-500",
        duration: 2000
      })
      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    },
    onError: (error: StandardError) =>
      handleError(error, {
        validation: "Invalid Login Details",
        401: "Invalid username or password"
      })
  })
}

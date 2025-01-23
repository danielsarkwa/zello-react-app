import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import AuthService from "@/api/auth"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { StandardError } from "@/types/standard-error"
import { User } from "@/schemas/user"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/auth"
import { useWorkspaceStore } from "@/store/workspace"

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
        className:
          "bg-green-500 text-white border-green-500 dark:bg-green-700 dark:text-white dark:border-green-700",
        duration: 6000
      })
      setTimeout(() => {
        navigate("/auth/login")
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
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setAuth } = useAuthStore()
  const { mutate: getCurrentUser } = useCurrentUser()

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      setAuth(response)
      toast({
        title: "Login Successful",
        description: "Welcome to Zello",
        className:
          "bg-green-500 text-white border-green-500 dark:bg-green-700 dark:text-white dark:border-green-700",
        duration: 1000
      })
      getCurrentUser()
      navigate("/load-workspaces")
    },
    onError: (error: StandardError) =>
      handleError(error, {
        validation: "Invalid Login Details",
        401: "Invalid username or password"
      })
  })
}

export const useCurrentUser = () => {
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: AuthService.getCurrentUser,
    onSuccess: (user: User) => {
      useAuthStore.getState().setUserProfile(user)
    },
    onError: (error: StandardError) => {
      // improve this by providing a recovery mechanism
      handleError(error)
    }
  })
}

export const logoutUser = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { clearAuth } = useAuthStore()
  const { clearWorkspace } = useWorkspaceStore()

  return () => {
    clearAuth()
    clearWorkspace()

    toast({
      title: "Logout Successful",
      description: "You have been logged out.",
      className: "bg-green-500 text-white border-green-500",
      duration: 2000
    })
    navigate("/auth/login")
  }
}

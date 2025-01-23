import { useToast } from "@/hooks/use-toast"
import { ErrorType, StandardError } from "@/types/standard-error"
import { useNavigate } from "react-router"

export const useErrorHandler = () => {
  const { toast } = useToast()
  const Navigate = useNavigate()

  const handleError = (
    error: StandardError,
    customMessages?: {
      // this may not be neccessary
      validation?: string
      [key: number]: string // For specific HTTP status codes
    }
  ) => {
    if (error.type === ErrorType.ZodValidationError) {
      const errorMessages = Object.entries(error.errors || {})
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("\n")

      toast({
        title: customMessages?.validation || "Ooops! Zod has a validation error",
        description: errorMessages,
        variant: "destructive"
      })
      return
    }

    if (error.type === ErrorType.APIValidationError) {
      toast({
        title: customMessages?.validation || "Ooops! Your request was invalid",
        description: error.message,
        variant: "destructive"
      })
      return
    }

    if (error.type === ErrorType.APIError) {
      toast({
        title: `Uh oh! Something went wrong :: ${error.status}`,
        description: error.message,
        variant: "destructive"
      })
      return
    }

    if (error.type === ErrorType.UnauthorizedError) {
      toast({
        title: "Uh oh! Your session expired",
        description: error.message,
        variant: "destructive",
        duration: 9000
      })
      Navigate("/auth/login")
      return
    }

    if (error.type === ErrorType.AuthenticationError) {
      toast({
        title: "Error logging in",
        description: error.message,
        variant: "destructive",
        duration: 7000
      })
      return
    }

    if (error.type === ErrorType.NetworkError) {
      toast({
        title: "Network Error",
        description: error.message,
        variant: "destructive",
        duration: 5000
      })
      return
    }

    // Check for specific status code messages
    if (error.status && customMessages?.[error.status]) {
      toast({
        title: "Error Message",
        description: customMessages[error.status],
        variant: "destructive"
      })
      return
    }

    // Default error message
    toast({
      title: "Error Message",
      description: error.message || "An unexpected error occurred.",
      variant: "destructive"
    })
  }

  return handleError
}

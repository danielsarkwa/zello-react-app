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
    if (error.type === ErrorType.ValidationError) {
      const errorMessages = Object.entries(error.errors || {})
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("\n")

      toast({
        title: customMessages?.validation || "Validation Error",
        description: errorMessages,
        variant: "destructive"
      })
      return
    }

    if (error.type === ErrorType.APIError) {
      toast({
        title: `API Error ${error.status}`,
        description: error.message,
        variant: "destructive"
      })
      return
    }

    if (error.type === ErrorType.UnauthorizedError) {
      toast({
        title: "Session Expired",
        description: error.message,
        variant: "destructive",
        duration: 10000
      })
      Navigate("/auth/login")
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
        title: "Error",
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

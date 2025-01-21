import { useAuthStore } from "@/store/auth"
import { ErrorType, StandardError } from "@/types/standard-error"
import axios, { AxiosError } from "axios"
import { ZodError } from "zod"
import { NavigationService } from "@/services/navigation"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "http://localhost:4321/api/v1"

if (!isDevelopment) {
  baseURL = "PRODUCTION_URL/api/v1"
}

const api = axios.create({
  baseURL
})

const handleZodError = (error: ZodError): StandardError => {
  const errors: Record<string, string[]> = {}

  error.errors.forEach((err) => {
    const path = err.path.join(".")
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(err.message)
  })

  return {
    status: 422,
    message: "Validation failed",
    errors,
    type: ErrorType.ValidationError
  }
}

const handleAxiosError = (error: AxiosError): StandardError => {
  // Handle network errors
  if (!error.response) {
    return {
      status: 0,
      message: "Please check your internet connection.",
      type: ErrorType.NetworkError
    }
  }

  if (error.response?.status === 401) {
    return {
      status: 401,
      message: (error.response.data as { message?: string }).message || "Unauthorized",
      type: ErrorType.AuthenticationError
    }
  }

  return {
    status: error.response?.status || 500,
    message: error.message || "An API error occurred",
    type: ErrorType.APIError
  }
}

export const isTokenExpired = () => {
  const { expires } = useAuthStore.getState()
  if (!expires) return true

  return new Date(expires) <= new Date()
}

api.interceptors.request.use((config) => {
  // Skip token expiration check for register and login requests
  if (config.url?.includes("/register") || config.url?.includes("/login")) {
    return config
  }

  if (isTokenExpired()) {
    // an improvement would be get a new token using the refresh token
    useAuthStore.getState().clearAuth()
    NavigationService.navigateToLogin()
    return Promise.reject(new Error("Your token expired, try logging in again."))
  }

  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let standardError: StandardError

    if (error instanceof ZodError) {
      standardError = handleZodError(error)
    } else if (axios.isAxiosError(error)) {
      standardError = handleAxiosError(error)
    } else {
      standardError = {
        status: 500,
        message: error instanceof Error ? error.message : "An unknown error occurred.",
        type: ErrorType.UnknownError
      }
    }

    return Promise.reject(standardError)
  }
)

export default api

import { ZodError } from "zod"
import axios, { AxiosError } from "axios"

import { useAuthStore } from "@/store/auth"
import NavigationService from "@/feature/navigation"

import { ErrorType, StandardError } from "@/types/standard-error"

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
    type: ErrorType.ZodValidationError
  }
}

const handleAxiosError = (error: AxiosError): StandardError => {
  if (!error.response) {
    return {
      status: 0,
      message: "Please check your internet connection.",
      type: ErrorType.NetworkError
    }
  }

  const data = error.response.data as any

  // Handle ASP.NET validation errors
  if (data?.errors && data?.title?.includes("validation errors")) {
    const formattedErrors: Record<string, string[]> = {}

    const descriptionMessages = data.errors.Description || []
    const message = Array.isArray(descriptionMessages) ? descriptionMessages.join(", ") : descriptionMessages

    return {
      status: error.response.status,
      message: message || "Validation failed",
      errors: formattedErrors,
      type: ErrorType.APIValidationError
    }
  }

  // Handle other status codes
  switch (error.response.status) {
    case 401:
      return {
        status: 401,
        message: data?.message || "Unauthorized",
        type: ErrorType.AuthenticationError
      }
    case 403:
      return {
        status: 403,
        message: data?.message || "Forbidden",
        type: ErrorType.UnauthorizedError
      }
    case 404:
      return {
        status: 404,
        message: data?.message || "Not found",
        type: ErrorType.NotFoundError
      }
    case 500:
      return {
        status: 500,
        message: data?.message || "Internal server error",
        type: ErrorType.InternalServerError
      }
    default:
      return {
        status: error.response.status,
        message: data?.message || "An error occurred",
        type: ErrorType.APIError
      }
  }
}

export const isTokenExpired = () => {
  const { expires } = useAuthStore.getState()
  if (!expires) return true

  return new Date(expires) <= new Date()
}

api.interceptors.request.use(async (config) => {
  const isPublicRoute = ["/register", "/login"].some((route) => config.url?.includes(route))
  if (isPublicRoute) return config

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

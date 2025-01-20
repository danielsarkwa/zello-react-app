import { ErrorType, StandardError } from "@/types/standard-error"
import axios, { AxiosError } from "axios"
import { ZodError } from "zod"

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
      message: "Network error",
      type: ErrorType.NetworkError,
    }
  }

  // if (error.response?.status === 401) {
    // localStorage.removeItem("token")
    // window.location.href = "/login"
    // remove the token and move them to login page
  // }
  
  if (error.response?.status === 401) {
    return {
      status: 401,
      message: "Authentication required",
      type: ErrorType.UnauthorizedError,
      // add action to redirect to login page
    }
  }

  return {
    status: error.response?.status || 500,
    message: error.message || "An API error occurred",
    type: ErrorType.APIError
  }
}

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
        message: error instanceof Error ? error.message : "An unknown error occurred",
        type: ErrorType.UnknownError
      }
    }

    return Promise.reject(standardError)
  }
)

export default api

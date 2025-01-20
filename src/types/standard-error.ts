export enum ErrorType {
  ValidationError = "ValidationError",
  APIError = "APIError",
  NetworkError = "NetworkError",
  UnknownError = "UnknownError",
  AuthenticationError = "AuthenticationError",
  UnauthorizedError = "Unauthorized",
  NotFoundError = "NotFoundError",
  InternalServerError = "InternalServerError"
}

export interface StandardError {
  status: number
  message: string
  errors?: Record<string, string[]>
  type: ErrorType
}

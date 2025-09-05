import { MESSAGES } from '../constants'

export class AppError extends Error {
  public readonly code: string
  public readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.details = details
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = MESSAGES.ERRORS.AUTHENTICATION_REQUIRED) {
    super('AUTHENTICATION_REQUIRED', message)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super('DATABASE_ERROR', message, details)
  }
}

export class NetworkError extends AppError {
  constructor(message: string, details?: unknown) {
    super('NETWORK_ERROR', message, details)
  }
}

// Error handling utilities
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError('UNKNOWN_ERROR', error.message, error)
  }

  return new AppError('UNKNOWN_ERROR', 'An unknown error occurred', error)
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError
}

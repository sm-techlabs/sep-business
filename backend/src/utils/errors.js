// utils/errors.js
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 4xx client errors
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") { super(message, 400); }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") { super(message, 401); }
}
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") { super(message, 403); }
}
export class NotFoundError extends AppError {
  constructor(message = "Not Found") { super(message, 404); }
}
export class MethodNotAllowedError extends AppError {
  constructor(message = "Method Not Allowed") { super(message, 405); }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict") { super(message, 409); }
}
export class GoneError extends AppError {
  constructor(message = "Gone") { super(message, 410); }
}
export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable Entity") { super(message, 422); }
}
export class TooManyRequestsError extends AppError {
  constructor(message = "Too Many Requests") { super(message, 429); }
}

// 5xx server errors
export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") { super(message, 500); }
}
export class BadGatewayError extends AppError {
  constructor(message = "Bad Gateway") { super(message, 502); }
}
export class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable") { super(message, 503); }
}
export class GatewayTimeoutError extends AppError {
  constructor(message = "Gateway Timeout") { super(message, 504); }
}

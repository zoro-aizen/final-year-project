export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super('Validation Error', 400);
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  code: number;
  errors?: Record<string, string[]>;
  stack?: string;
}

export const handleError = (error: Error): ErrorResponse => {
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      status: 'error',
      message: error.message,
      code: error.statusCode,
    };

    if (error instanceof ValidationError) {
      response.errors = error.errors;
    }

    if (process.env.NODE_ENV === 'development') {
      response.stack = error.stack;
    }

    return response;
  }

  // Handle unknown errors
  const response: ErrorResponse = {
    status: 'error',
    message: 'Internal Server Error',
    code: 500,
  };

  if (process.env.NODE_ENV === 'development') {
    response.message = error.message;
    response.stack = error.stack;
  }

  return response;
};

export const assertNonNull = <T>(
  value: T | null | undefined,
  message: string = 'Value is null or undefined'
): T => {
  if (value === null || value === undefined) {
    throw new AppError(message, 500);
  }
  return value;
};

export const assertCondition = (
  condition: boolean,
  message: string = 'Assertion failed'
): void => {
  if (!condition) {
    throw new AppError(message, 500);
  }
};

export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler && error instanceof Error) {
      errorHandler(error);
    }
    throw error;
  }
};

export const validateInput = (
  input: Record<string, any>,
  schema: Record<string, (value: any) => boolean>,
  messages: Record<string, string> = {}
): void => {
  const errors: Record<string, string[]> = {};

  for (const [key, validator] of Object.entries(schema)) {
    if (!validator(input[key])) {
      errors[key] = [
        messages[key] || `Invalid value provided for field '${key}'`,
      ];
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }
};

export const createErrorLogger =
  (logFn: (message: string) => void) => (error: Error) => {
    const timestamp = new Date().toISOString();
    const errorDetails = error instanceof AppError
      ? `[${error.statusCode}] ${error.message}`
      : error.message;

    logFn(`[${timestamp}] Error: ${errorDetails}`);

    if (process.env.NODE_ENV === 'development') {
      logFn(error.stack || 'No stack trace available');
    }
  };

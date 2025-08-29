import { NextResponse } from "next/server";

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public timestamp: Date;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = "Access denied") {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Resource conflict") {
    super(message, 409);
  }
}

// Error logging interface
interface ErrorLogger {
  log(error: ApiError | Error, context?: Record<string, unknown>): void;
  logPrismaError(error: unknown, context?: Record<string, unknown>): void;
  logValidationError(error: unknown, context?: Record<string, unknown>): void;
}

// Default console logger
class ConsoleErrorLogger implements ErrorLogger {
  log(error: ApiError | Error, context?: Record<string, unknown>): void {
    const logData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...(error instanceof ApiError && {
        statusCode: error.statusCode,
        isOperational: error.isOperational,
      }),
      ...context,
    };

    if (error instanceof ApiError && error.isOperational) {
      console.warn("Operational Error:", logData);
    } else {
      console.error("Error:", logData);
    }
  }

  logPrismaError(error: Record<string, unknown>, context?: Record<string, unknown>): void {
    console.error("Prisma Error:", {
      code: error.code,
      message: error.message,
      meta: error.meta,
      timestamp: new Date().toISOString(),
      ...context,
    });
  }

  logValidationError(error: Record<string, unknown>, context?: Record<string, unknown>): void {
    console.warn("Validation Error:", {
      issues: error.issues,
      message: error.message,
      timestamp: new Date().toISOString(),
      ...context,
    });
  }
}

// Global logger instance (can be replaced with external logging service)
let errorLogger: ErrorLogger = new ConsoleErrorLogger();

export function setErrorLogger(logger: ErrorLogger): void {
  errorLogger = logger;
}

export function handleApiError(
  error: unknown,
  context?: Record<string, unknown>
): NextResponse {
  // Handle known API errors
  if (error instanceof ApiError) {
    errorLogger.log(error, context);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as Record<string, unknown>;
    errorLogger.logPrismaError(prismaError, context);

    switch (prismaError.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Resource already exists" },
          { status: 409 }
        );
      case "P2025":
        return NextResponse.json(
          { error: "Resource not found" },
          { status: 404 }
        );
      case "P2003":
        return NextResponse.json(
          { error: "Foreign key constraint failed" },
          { status: 400 }
        );
      default:
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // Handle validation errors (Zod, Joi, etc.)
  if (error && typeof error === "object" && "issues" in error) {
    const validationError = error as { issues: unknown[] };
    errorLogger.logValidationError(validationError, context);
    return NextResponse.json(
      { error: "Validation failed", details: validationError.issues },
      { status: 400 }
    );
  }

  // Handle unknown errors
  if (error instanceof Error) {
    errorLogger.log(error, context);
  } else {
    console.error("Unknown error:", error, context);
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export function withErrorHandler<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      throw error; // Re-throw to be handled by the route wrapper
    }
  };
}

export function createApiHandler<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      const result = await handler(...args);
      // If the result is already a NextResponse, return it
      if (result instanceof NextResponse) {
        return result;
      }
      // Otherwise, wrap it in a NextResponse
      return NextResponse.json(result);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

// Utility function to create API handlers with context
export function createApiHandlerWithContext<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>,
  getContext?: (...args: T) => Record<string, unknown>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      const result = await handler(...args);
      if (result instanceof NextResponse) {
        return result;
      }
      return NextResponse.json(result);
    } catch (error) {
      const context = getContext ? getContext(...args) : undefined;
      return handleApiError(error, context);
    }
  };
}

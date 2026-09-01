
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** 404 - el recurso solicitado no existe. */
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

/** 400 - la solicitud del cliente es inválida (REQ-05). */
export class ValidationError extends AppError {
  constructor(message = "Datos inválidos", details?: unknown) {
    super(message, 400, details);
  }
}

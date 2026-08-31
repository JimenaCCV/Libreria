/**
 * REQ-09 · Manejo centralizado de errores
 *
 * Clase base de error de aplicación. Cualquier capa (Service, Repository)
 * puede lanzar un AppError (o una subclase) con un `statusCode` HTTP
 * explícito. El middleware de errores (errorHandler.ts) es el único
 * lugar que traduce esto a una respuesta HTTP, así los Controllers no
 * tienen que repetir try/catch con lógica de status codes.
 */
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

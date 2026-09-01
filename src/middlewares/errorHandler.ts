import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";


export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // Express identifica este middleware como manejador de errores por su
  // firma de 4 argumentos; `next` es requerido aunque no se use.
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Error no anticipado: no se expone su mensaje interno al cliente,
  // pero sí se registra en el servidor para depuración.
  console.error("Error inesperado:", err);
  res.status(500).json({
    error: {
      message: "Ocurrió un error interno en el servidor.",
    },
  });
}

/** 404 para rutas que no coinciden con ningún endpoint registrado. */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: `La ruta ${req.method} ${req.originalUrl} no existe.`,
    },
  });
}

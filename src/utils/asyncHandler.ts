import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * REQ-09 · Manejo centralizado de errores
 *
 * Envuelve un Controller async y reenvía cualquier excepción a
 * `next(err)`. Sin esto, cada Controller tendría que repetir un
 * try/catch idéntico. Con esto, un Controller solo escribe la lógica
 * "feliz" y cualquier error (validación, no encontrado, fallo de la
 * capa de persistencia) termina en el errorHandler central.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

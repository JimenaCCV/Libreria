import express, { type Application } from "express";
import { createBookRouter } from "./routes/bookRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { container } from "./container.js";

/**
 * Ensambla la aplicación Express: middlewares globales, rutas por
 * recurso y, al final, el manejo centralizado de errores (REQ-09).
 * El orden de app.use() importa: el errorHandler debe ir después de
 * las rutas para poder capturar los errores que ellas produzcan.
 */
export function createApp(): Application {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/books", createBookRouter(container.bookController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

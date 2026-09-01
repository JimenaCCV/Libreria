import express, { type Application } from "express";
import { createBookRouter } from "./routes/bookRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { container } from "./container.js";


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

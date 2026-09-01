import { Router } from "express";
import type { BookController } from "../controllers/BookController.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export function createBookRouter(controller: BookController): Router {
  const router = Router();

  router.get("/", asyncHandler(controller.getAll));
  router.get("/:id", asyncHandler(controller.getById));
  router.post("/", asyncHandler(controller.create));
  router.patch("/:id", asyncHandler(controller.update));
  router.delete("/:id", asyncHandler(controller.delete));

  return router;
}

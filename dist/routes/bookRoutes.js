import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
/**
 * REQ-02 a REQ-08 (definición de rutas)
 *
 * El Router solo mapea verbo+path HTTP a un método del Controller.
 * No contiene lógica de negocio ni de acceso a datos (REQ-08).
 */
export function createBookRouter(controller) {
    const router = Router();
    router.get("/", asyncHandler(controller.getAll));
    router.get("/:id", asyncHandler(controller.getById));
    router.post("/", asyncHandler(controller.create));
    router.patch("/:id", asyncHandler(controller.update));
    router.delete("/:id", asyncHandler(controller.delete));
    return router;
}

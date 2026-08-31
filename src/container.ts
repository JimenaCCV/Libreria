import type { BookRepository } from "./repositories/BookRepository.js";
import { InMemoryBookRepository } from "./repositories/InMemoryBookRepository.js";
import { BookService } from "./services/BookService.js";
import { BookController } from "./controllers/BookController.js";

/**
 * REQ-10 · Desacoplamiento de persistencia (punto único de ensamblaje)
 *
 * Este es el ÚNICO archivo del proyecto que decide QUÉ implementación
 * concreta de `BookRepository` se usa. Todo lo demás (Service,
 * Controller, rutas) depende solo de la interfaz `BookRepository`.
 *
 * Para migrar de memoria a PostgreSQL o MongoDB:
 *   1. Crear `PostgresBookRepository implements BookRepository` (o
 *      `MongoBookRepository`) en src/repositories/, usando el driver u
 *      ORM que corresponda (pg, Prisma, Mongoose, etc.).
 *   2. Cambiar la línea `new InMemoryBookRepository()` de abajo por
 *      `new PostgresBookRepository(pool)` (o el equivalente).
 *
 * Ninguna otra línea del proyecto necesita cambiar: BookService y
 * BookController siguen recibiendo algo que cumple `BookRepository`.
 */
const bookRepository: BookRepository = new InMemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

export const container = {
  bookRepository,
  bookService,
  bookController,
};

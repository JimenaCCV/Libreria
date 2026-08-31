import type { Book, BookFilters, CreateBookDTO, UpdateBookDTO } from "../models/Book.js";

/**
 * REQ-10 · Desacoplamiento de persistencia
 *
 * Este es el "contrato" (puerto) que define qué operaciones de acceso a
 * datos existen, sin decir CÓMO se implementan. El Service depende
 * únicamente de esta interfaz, nunca de una implementación concreta.
 *
 * Para migrar de memoria a PostgreSQL, MongoDB, etc., basta con crear
 * una nueva clase que implemente `BookRepository` (por ejemplo
 * `PostgresBookRepository`) y cambiar UNA línea en el contenedor de
 * dependencias (ver src/container.ts). Ni el Service ni el Controller
 * se modifican.
 */
export interface BookRepository {
  findAll(filters?: BookFilters): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>;
  create(data: CreateBookDTO): Promise<Book>;
  update(id: string, data: UpdateBookDTO): Promise<Book | undefined>;
  delete(id: string): Promise<boolean>;
}

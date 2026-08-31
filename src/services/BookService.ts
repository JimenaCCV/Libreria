import type { Book, BookFilters, CreateBookDTO, UpdateBookDTO } from "../models/Book.js";
import type { BookRepository } from "../repositories/BookRepository.js";
import { NotFoundError, ValidationError } from "../errors/AppError.js";

/**
 * REQ-05 · Validación de datos
 *
 * Reglas de validación de negocio. Viven fuera del Repository (que solo
 * sabe leer/escribir) y fuera del Controller (que solo sabe de HTTP).
 * Se exportan como funciones puras para poder reutilizarlas en create()
 * y en update() y para poder probarlas de forma aislada.
 */
function validateTitle(title: unknown): string {
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new ValidationError("El título es obligatorio y no puede estar vacío o compuesto solo por espacios.");
  }
  return title.trim();
}

function validateAuthor(author: unknown): string {
  if (typeof author !== "string" || author.trim().length === 0) {
    throw new ValidationError("El autor es obligatorio y no puede estar vacío.");
  }
  return author.trim();
}

function validateYear(year: unknown): number {
  const numericYear = typeof year === "string" ? Number(year) : year;
  if (typeof numericYear !== "number" || Number.isNaN(numericYear) || !Number.isInteger(numericYear)) {
    throw new ValidationError("El año debe ser un número entero válido.");
  }
  return numericYear;
}

function validateCreatePayload(data: Partial<CreateBookDTO>): CreateBookDTO {
  return {
    title: validateTitle(data.title),
    author: validateAuthor(data.author),
    year: validateYear(data.year),
  };
}

/** REQ-07: en update solo se validan las propiedades que el cliente envía. */
function validateUpdatePayload(data: UpdateBookDTO): UpdateBookDTO {
  const result: UpdateBookDTO = {};

  if (Object.keys(data).length === 0) {
    throw new ValidationError("Debe enviar al menos una propiedad para actualizar.");
  }
  if ("title" in data) result.title = validateTitle(data.title);
  if ("author" in data) result.author = validateAuthor(data.author);
  if ("year" in data) result.year = validateYear(data.year);

  return result;
}

/**
 * REQ-02 a REQ-08 (lógica de negocio)
 *
 * El Service orquesta el caso de uso: valida, delega la persistencia al
 * Repository (a través de su interfaz) y traduce condiciones de negocio
 * (p. ej. "no existe") a errores tipados que el errorHandler central
 * sabrá convertir en la respuesta HTTP adecuada.
 *
 * El Service NUNCA sabe cómo se guardan los datos (no hay SQL, no hay
 * consultas de Mongo aquí): solo conoce `BookRepository` como interfaz.
 */
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(filters?: BookFilters): Promise<Book[]> {
    return this.bookRepository.findAll(filters);
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundError(`No se encontró un libro con id "${id}".`);
    }
    return book;
  }

  async createBook(data: Partial<CreateBookDTO>): Promise<Book> {
    const validData = validateCreatePayload(data);
    return this.bookRepository.create(validData);
  }

  async updateBook(id: string, data: UpdateBookDTO): Promise<Book> {
    const validData = validateUpdatePayload(data);
    const updated = await this.bookRepository.update(id, validData);
    if (!updated) {
      throw new NotFoundError(`No se encontró un libro con id "${id}".`);
    }
    return updated;
  }

  async deleteBook(id: string): Promise<void> {
    const deleted = await this.bookRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`No se encontró un libro con id "${id}".`);
    }
  }
}

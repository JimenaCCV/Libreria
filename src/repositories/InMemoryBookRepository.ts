import { randomUUID } from "node:crypto";
import type { Book, BookFilters, CreateBookDTO, UpdateBookDTO } from "../models/Book.js";
import type { BookRepository } from "./BookRepository.js";

/**
 * REQ-02 a REQ-10 (persistencia)
 *
 * Implementación en memoria del contrato `BookRepository`. Es la única
 * clase de todo el proyecto que sabe CÓMO se guardan los datos
 * (un arreglo en memoria). No contiene ninguna regla de negocio: solo
 * sabe leer, escribir, filtrar y borrar.
 *
 * El filtrado (REQ-08) se resuelve aquí porque es una operación de
 * consulta de datos; las reglas de negocio (qué es válido, etc.) siguen
 * viviendo en el Service.
 *
 * Para migrar a otra tecnología (PostgreSQL, MongoDB...) se reemplaza
 * esta clase por una que implemente `BookRepository` usando el driver /
 * ORM correspondiente (por ejemplo con consultas SQL o con Mongoose).
 * El resto de la aplicación no cambia porque solo conoce la interfaz.
 */
export class InMemoryBookRepository implements BookRepository {
  private books: Book[] = [];

  async findAll(filters?: BookFilters): Promise<Book[]> {
    let result = [...this.books];

    if (filters?.author) {
      const term = filters.author.toLowerCase();
      result = result.filter((b) => b.author.toLowerCase().includes(term));
    }
    if (filters?.title) {
      const term = filters.title.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(term));
    }
    if (filters?.year !== undefined) {
      result = result.filter((b) => b.year === filters.year);
    }

    return result;
  }

  async findById(id: string): Promise<Book | undefined> {
    return this.books.find((b) => b.id === id);
  }

  async create(data: CreateBookDTO): Promise<Book> {
    const book: Book = {
      id: randomUUID(),
      title: data.title,
      author: data.author,
      year: data.year,
    };
    this.books.push(book);
    return book;
  }

  async update(id: string, data: UpdateBookDTO): Promise<Book | undefined> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return undefined;

    const updated: Book = { ...this.books[index], ...data };
    this.books[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }
}

import type { Book, BookFilters, CreateBookDTO, UpdateBookDTO } from "../models/Book.js";


export interface BookRepository {
  findAll(filters?: BookFilters): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>;
  create(data: CreateBookDTO): Promise<Book>;
  update(id: string, data: UpdateBookDTO): Promise<Book | undefined>;
  delete(id: string): Promise<boolean>;
}

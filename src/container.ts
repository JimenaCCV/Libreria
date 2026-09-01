import type { BookRepository } from "./repositories/BookRepository.js";
import { InMemoryBookRepository } from "./repositories/InMemoryBookRepository.js";
import { BookService } from "./services/BookService.js";
import { BookController } from "./controllers/BookController.js";


const bookRepository: BookRepository = new InMemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

export const container = {
  bookRepository,
  bookService,
  bookController,
};

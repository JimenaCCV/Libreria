/**
 * REQ-02 a REQ-08 (capa HTTP)
 *
 * El Controller es la única capa que conoce Express (req/res, status
 * codes, headers). Traduce la solicitud HTTP en una llamada al Service
 * y traduce el resultado del Service en una respuesta HTTP.
 *
 * No contiene reglas de negocio ni accede al almacenamiento
 * directamente: todo eso vive en Service/Repository. Tampoco contiene
 * try/catch: los errores se delegan a `asyncHandler` + el middleware
 * central de errores (REQ-09).
 */
export class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    /** GET /api/books  (REQ-02, filtros vía query en REQ-08) */
    getAll = async (req, res) => {
        const { author, title, year } = req.query;
        const filters = {};
        if (typeof author === "string")
            filters.author = author;
        if (typeof title === "string")
            filters.title = title;
        if (typeof year === "string" && year.trim() !== "")
            filters.year = Number(year);
        const books = await this.bookService.getAllBooks(filters);
        res.status(200).json(books);
    };
    /** GET /api/books/:id  (REQ-03) */
    getById = async (req, res) => {
        const { id } = req.params;
        const book = await this.bookService.getBookById(id);
        res.status(200).json(book);
    };
    /** POST /api/books  (REQ-04, validado en REQ-05) */
    create = async (req, res) => {
        const book = await this.bookService.createBook(req.body);
        res.status(201).json(book);
    };
    /** PATCH /api/books/:id  (REQ-07) */
    update = async (req, res) => {
        const { id } = req.params;
        const book = await this.bookService.updateBook(id, req.body);
        res.status(200).json(book);
    };
    /** DELETE /api/books/:id  (REQ-06) */
    delete = async (req, res) => {
        const { id } = req.params;
        await this.bookService.deleteBook(id);
        res.status(204).send();
    };
}

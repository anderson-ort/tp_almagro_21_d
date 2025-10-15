import express from 'express';
import { BookController } from '../controllers/BookController.js';

const BookRouter = express.Router();

BookRouter.get('/', BookController.getAllBooks);
BookRouter.get('/:id', BookController.getBookById);
BookRouter.post('/', BookController.createBook);
BookRouter.put('/:id', BookController.updateBook);
BookRouter.delete('/:id', BookController.deleteBook);

export default BookRouter;

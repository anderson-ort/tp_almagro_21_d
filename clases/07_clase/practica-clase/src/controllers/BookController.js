import MongooseBookRepository from "../repositories/mongoose-mongodb/MongooseBookRepository.js";
import SequelizeBookRepository from "../repositories/sequelize-mysql/SequelizeBookRepository.js";

// export const BookController = {


//     getAllBooks: async (req, res) => {
//         try {
//             const books = await SequelizeBookRepository.getAllBooks();
//             res.json(books);
//         } catch (error) {
//             console.error('Error al obtener libros:', error);
//             res.status(500).json({ error: 'Error interno del servidor' });
//         }
//     },
//     getBookById: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const book = await SequelizeBookRepository.getBookById(id);
//             if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
//             res.json(book);
//         } catch (error) {
//             res.status(500).json({ error: 'Error interno del servidor' });
//         }
//     },
//     createBook: async (req, res) => {
//         try {
//             const newBook = await SequelizeBookRepository.createBook(req.body);
//             res.status(201).json(newBook);
//         } catch (error) {
//             res.status(400).json({ error: 'Datos inválidos o incompletos' });
//         }
//     },
//     updateBook: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updated = await SequelizeBookRepository.updateBook(id, req.body);
//             if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
//             res.json(updated);
//         } catch (error) {
//             res.status(400).json({ error: 'Error al actualizar el libro' });
//         }
//     },
//     deleteBook: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deleted = await SequelizeBookRepository.deleteBook(id);
//             if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
//             res.status(204).send();
//         } catch (error) {
//             res.status(500).json({ error: 'Error interno del servidor' });
//         }
//     }
// }

export const BookController = {

    getAllBooks: async (req, res) => {
        try {
            const books = await MongooseBookRepository.getAllBooks();
            res.json(books);
        } catch (error) {
            console.error('Error al obtener libros:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getBookById: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await MongooseBookRepository.getBookById(id);
            if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    createBook: async (req, res) => {
        try {
            const newBook = await MongooseBookRepository.createBook(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ error: 'Datos inválidos o incompletos' });
        }
    },

    updateBook: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await MongooseBookRepository.updateBook(id, req.body);
            if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el libro' });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await MongooseBookRepository.deleteBook(id);
            if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

};

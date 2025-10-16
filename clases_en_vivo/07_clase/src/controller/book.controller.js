import { BookRepository } from "../repository/book.respository.js";

export const BookController = {
    getAllBooks: async (request, response) => {
        try {
            const books = await BookRepository.getAll()
            response.json(
                { books }
            )
        } catch (error) {
            console.log("Error al obtener los books", error.message);
            response.status(500).json(
                { error: "error interno del server" }
            )
        }
    }
}

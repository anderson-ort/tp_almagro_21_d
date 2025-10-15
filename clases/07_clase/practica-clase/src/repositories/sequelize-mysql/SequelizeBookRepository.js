import Book from "../../models/mysql/book.js";
import User from "../../models/mysql/user.js";

class SequelizeBookRepository {
    async getAllBooks() {
        return await Book.findAll({
            include: {
                model: User,
                as: 'renter',
                attributes: ['id', 'name', 'email']
            }
        });
    }

    async getBookById(id) {
        return await Book.findByPk(id, {
            include: {
                model: User,
                as: 'renter',
                attributes: ['id', 'name', 'email']
            }
        });
    }

    async createBook(bookData) {
        return await Book.create(bookData);
    }

    async updateBook(id, updateData) {
        const book = await Book.findByPk(id);
        if (!book) return null;
        return await book.update(updateData);
    }

    async deleteBook(id) {
        const book = await Book.findByPk(id);
        if (!book) return null;
        await book.destroy();
        return true;
    }
}

export default new SequelizeBookRepository(); // Singleton implícito

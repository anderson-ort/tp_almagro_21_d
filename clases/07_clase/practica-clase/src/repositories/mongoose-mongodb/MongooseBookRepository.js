import { Book } from "../../models/mongo/Book.js";

class MongooseBookRepository {
    async getAllBooks() {
        return await Book.find().populate('rentedBy', 'id name email').exec();
    }

    async getBookById(id) {
        return await Book.findById(id).populate('rentedBy', 'id name email').exec();
    }

    async createBook(bookData) {
        const book = new Book(bookData);
        return await book.save();
    }

    async updateBook(id, updateData) {
        // findByIdAndUpdate devuelve el doc antiguo por defecto, con { new: true } devuelve el actualizado
        return await Book.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteBook(id) {
        const result = await Book.findByIdAndDelete(id).exec();
        return result != null;
    }
}

export default new MongooseBookRepository();

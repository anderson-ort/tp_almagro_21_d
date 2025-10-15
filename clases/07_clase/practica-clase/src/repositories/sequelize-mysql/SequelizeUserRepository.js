import Book from "../../models/mysql/book.js";
import User from "../../models/mysql/user.js";

class SequelizeUserRepository {
    async getAllUsers() {
        return await User.findAll({
            include: {
                model: Book,
                as: 'books',
                attributes: ['id', 'title', 'author', 'rentedAt']
            }
        });
    }

    async getUserById(id) {
        return await User.findByPk(id, {
            include: {
                model: Book,
                as: 'books',
                attributes: ['id', 'title', 'author', 'rentedAt']
            }
        });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async updateUser(id, updateData) {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update(updateData);
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return true;
    }
}

export default new SequelizeUserRepository(); // Singleton implícito

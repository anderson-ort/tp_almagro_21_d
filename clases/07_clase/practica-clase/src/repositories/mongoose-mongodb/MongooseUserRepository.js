import { User } from "../../models/mongo/Book.js";

class MongooseUserRepository {
    async getAllUsers() {
        return await User.find()
            .populate('books', 'id title author rentedAt')
            .exec();
    }

    async getUserById(id) {
        return await User.findById(id)
            .populate('books', 'id title author rentedAt')
            .exec();
    }

    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteUser(id) {
        const result = await User.findByIdAndDelete(id).exec();
        return result != null;
    }
}

export default new MongooseUserRepository();

import { BookModel } from "../model/book.mongoose.model.js"


export const BookRepository = {
    getAll: async () => {
        return await BookModel.find({})
    },

    getOne: async (id) => {
        return await BookModel.findById(id)
    },

    deleteOne: async (id) => {
        return await BookModel.destroy({ where: { id } })
    },

    updateOne: async ({ id, name, category, created_date }) => {
        return await BookModel.update({
            name, category, created_date
        }, { where: { id } })
    },
    createOne: async ({ name, category }) => {
        return await BookModel.create({name,category})
    }

}
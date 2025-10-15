import { mongoDb } from "../databases/mongo.cnx.js"

const books = await mongoDb.collection("books")

export const MongoRepository = {
    getAll: async () => {
        const responseBooks = await books.find({}).toArray();
        return { data: responseBooks }
    },

    createOne: async (book) => {
        const responseBook = await books.insertOne(book)
        return { data: responseBook }
    }

} 
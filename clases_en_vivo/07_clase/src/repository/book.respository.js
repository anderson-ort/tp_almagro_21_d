import { BookModel } from "../model/book.model.js"

/**Quiero implementar la capa por medio de sequelize
 * Porque? OR; -> Bases de datos SQL
 * https://sequelize.org/
*/
export const BookRepository = {
    getAll: async () => {
        return await BookModel.findAll()
    }
}
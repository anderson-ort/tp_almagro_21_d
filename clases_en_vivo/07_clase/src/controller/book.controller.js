// import { BookRepository } from "../repository/book.respository.js";
import { BookRepository } from "../repository/book.mongoose.repository.js";
import { updateModel } from "../utils/updateModel.util.js";
import { validateCategory, validateName } from "../validators/validators.model.js";

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
    },

    getById: async (request, response) => {
        const { id } = request?.params

        try {
            const book = await BookRepository.getOne(id)
            response.json({
                code: 200,
                ok: true,
                payload: book
            })

        } catch (error) {
            response.status(400).json(
                { error: error.message }
            )
        }
    },

    deleteById: async (request, response) => {
        const { id } = request?.params

        try {

            const book = await BookRepository.getOne(id)

            console.log(book);


            if (!book) {
                response.status(422).json(
                    { error: "El libro no existe" }
                )
                return
            }


            await BookRepository.deleteOne(id)


            response.json({
                code: 200,
                ok: true,
                payload: {
                    message: `El book :${book.name} ha sido borrado con exito`
                }
            })

        } catch (error) {
            response.status(400).json(
                { error: error.message }
            )
        }
    },
    createByJson: async (request, response) => {
        const { name, category } = request.body

        const { valid: validName } = validateName(name)
        const { valid: validCategory } = validateCategory(category)

        const validacionGeneral = validName && validCategory

        if (!validacionGeneral) {

            response.json({
                message: "No esta validado el valor de Nombre o de Categoria"
            }).status(422)
            return
        }

        try {

            const book = BookRepository.createOne({ name, category })

            response.json({
                code: 200,
                ok: true,
                payload: {
                    message: "El libro fue creado exitosamente",
                    fechaCreacion: book.created_date
                }
            })
        } catch (error) {

            response.status(400).json(
                { error: error.message }
            )
        }
    },

    // hacer un endpoint que haga una busqueda por el nombre y actualice

    updateByJson: async (request, response) => {

        const bookInput = request.body



        try {

            const bookFromDataBase = await BookRepository.getOne(bookInput.id)



            if (!bookFromDataBase) {
                response.status(422).json(
                    { error: "El libro no existe" }
                )
                return
            }

            const { valid: validName } = validateName(bookInput.name)
            const { valid: validCategory } = validateCategory(bookInput.category)

            const validacionGeneral = validName && validCategory

            if (!validacionGeneral) {
                response.json({
                    message: "No esta validado el valor de Nombre o de Categoria"
                }).status(422)
                return
            }

            const updatedData = updateModel({
                id: bookFromDataBase.id,
                name: bookFromDataBase.name,
                category: bookFromDataBase.category,
                created_date: bookFromDataBase.created_date

            }, bookInput)


            

            await BookRepository.updateOne(updatedData)

            response.json({
                code: 200,
                ok: true,
                payload: {
                    message: `El libro:  ${updatedData.name} fue actualizado exitosamente`
                }
            })
        } catch (error) {

            response.status(400).json(
                { error: error.message }
            )
        }

    }



}

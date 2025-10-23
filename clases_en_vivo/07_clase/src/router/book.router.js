import express from "express"
import { BookController } from "../controller/book.controller.js"

const BookRouter = express.Router()


BookRouter.get("/all", BookController.getAllBooks)

//  CRUD
BookRouter
    .get("/select/:id", BookController.getById)
    .delete("/delete/:id", BookController.deleteById)
    // pasarle la data por medio de un json --> body
    .post("/create",  BookController.createByJson)
    .patch("/update", BookController.updateByJson)


export default BookRouter
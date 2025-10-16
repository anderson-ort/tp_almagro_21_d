import express from "express"
import { BookController } from "../controller/book.controller.js"

const BookRouter = express.Router()


BookRouter.get("/all", BookController.getAllBooks)

export default BookRouter
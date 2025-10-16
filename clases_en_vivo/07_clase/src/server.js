import express from "express"
import BookRouter from "./router/book.router.js"

const server = express()
server.use(express.json())
server.use("/api/book", BookRouter)

export default server
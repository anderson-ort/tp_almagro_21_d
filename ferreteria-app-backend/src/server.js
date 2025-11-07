import express from "express"
import ProductAllRouter from "./router/product.all.router.js"
import ProductRouter from "./router/producto.router.js"
import notFoundHandler from "./middleware/notFoundHandler.js"

const server = express()
server.use(express.json())


server.use("/", WelcomePacRouter)

// user authentication by JWT

// not protected
server.use("/api/v1/products", ProductAllRouter)
// protected
server.use("/api/v1/product", ProductRouter)

// not found
server.use(notFoundHandler)

export default server
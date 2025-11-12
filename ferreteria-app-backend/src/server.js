import express from "express"
import ProductAllRouter from "./router/product.all.router.js"
import ProductRouter from "./router/product.crud.router.js"
import notFoundHandler from "./middleware/notFoundHandler.js"
import ApiUserRouter from "./router/user.route.js"
import WelcomeRouter from "./router/welcome.router.js"

const server = express()
server.use(express.json())


server.use("/", WelcomeRouter)

// user authentication by JWT
server.use("/api/user", ApiUserRouter)

// not protected
server.use("/api/v1/products", ProductAllRouter)

// protected
server.use("/api/v1/product", ProductRouter)

// not found
server.use(notFoundHandler)

export default server
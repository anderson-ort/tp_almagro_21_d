import express from "express"
import { ProductController } from "../controllers/Product.js"
import { authenticateToken } from "../middleware/authentication.js"

const ProductAllRouter = express.Router()

ProductAllRouter
.get("/", authenticateToken ,ProductController.getAllProducts)

export default ProductAllRouter
import express from "express"
import { ProductController } from "../controllers/Product.js"
const ProductAllRouter = express.Router()


ProductAllRouter.get("/", ProductController.getAllProducts)

export default ProductAllRouter
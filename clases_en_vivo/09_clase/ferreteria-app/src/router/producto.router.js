import { Router } from "express"
import { ProductController } from "../controllers/Product.js"

const ProductRouter = Router()

ProductRouter
    .get("/select/:id", ProductController.getById)
    .delete("/delete/:id", ProductController.deleteById)
    // pasarle la data por medio de un json --> body
    .post("/create",  ProductController.createByJson)
    .patch("/update", ProductController.updateByJson)


export default ProductRouter
import { Router } from "express"
import { ProductController } from "../controllers/Product.js"
import { authenticateToken } from "../middleware/authentication.js"

const ProductRouter = Router()



ProductRouter
    .get("/select/:id", ProductController.getById)
    .delete("/delete/:id", ProductController.deleteById)
    // pasarle la data por medio de un json --> body
    .post("/create", authenticateToken, ProductController.createByJson)
    .patch("/update",authenticateToken, ProductController.updateByJson)


export default ProductRouter
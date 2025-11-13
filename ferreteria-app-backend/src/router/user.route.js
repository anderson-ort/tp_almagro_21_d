import { Router } from "express"
import { ApiUserController } from "../controllers/Users.js"

const ApiUserRouter = Router()

ApiUserRouter
// registro del usuario
    .post("/signup", ApiUserController.signup)
// el login del usuario
    .post("/login", ApiUserController.login)


export default ApiUserRouter
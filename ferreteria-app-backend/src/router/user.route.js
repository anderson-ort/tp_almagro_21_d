import { Router } from "express"
import { ApiUserController } from "../controllers/Users.js"

const ApiUserRouter = Router()


ApiUserRouter
    .post("/signup", ApiUserController.signup)
    .post("/login", ApiUserController.login)


export default ApiUserRouter
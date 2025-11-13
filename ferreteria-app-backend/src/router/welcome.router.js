import { Router } from "express";
import AppStatus from "../controllers/Status.js";

const WelcomeRouter = Router()

WelcomeRouter
    .get("/", AppStatus.welcome)
    .get("/healthCheck", AppStatus.healtCheck)

export default WelcomeRouter
import express from 'express';
import { loginAdmin } from '../controllers/admin.login.controller.js';

const jwtRouter = express.Router();

jwtRouter.post('/user/login', loginAdmin);

export default jwtRouter;
import express from 'express';
import morgan from 'morgan';
import { ProductController } from './controllers/product.controller.js';

const morgarnModule = morgan(':method :url :status :res[content-length] - :response-time ms');

const server = express();

server.use(morgarnModule);
server.get('/api/producto/empanada/:id', ProductController.getById);

export default server;

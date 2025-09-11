import express from 'express';
import morgan from 'morgan';
import { ProductController } from './controllers/product.controller.js';

const morgarnModule = morgan(':method :url :status :res[content-length] - :response-time ms');

const server = express();

// middleware --> transforma todas las peticiones que vienen desde body como json
server.use(express.json());
// middleware --> lo que hace es logging de las peticiones al server
server.use(morgarnModule);

server.post('/api/producto', ProductController.createProduct);
server.get('/api/producto/empanada', ProductController.getByIdBody);
server.get('/api/producto/empanada/:id', ProductController.getById);

export default server;

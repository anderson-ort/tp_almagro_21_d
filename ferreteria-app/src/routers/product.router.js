import express from 'express';
import { ProductController } from '../controllers/product.controller.js';

const productRouter = express.Router();
const { createProduct, getByIdBody, deleteProduct, updateProduct } = ProductController;

productRouter
  .get('/api/producto', getByIdBody)
  .post('/api/producto', createProduct)
  .delete('/api/producto/:id', deleteProduct)
  .patch('/api/producto/:id', updateProduct);

export default productRouter;

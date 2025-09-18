import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { testMiddleware } from '../middleware/test.middleware.js';
import { apikeyAuth } from '../auth/auth.apikey.js';
import { validateTokenMiddleware } from '../middleware/auth.middleware.js';

const { getAllData } = ProductController;
const productAdminRouter = express.Router();

productAdminRouter
  .get('/api/admin/products', testMiddleware, getAllData)
  .get('/api/apikey/products', apikeyAuth, getAllData)
  .get('/api/jwtoken/products', validateTokenMiddleware, getAllData);
export default productAdminRouter;

import { Product } from '../models/product.model.js';
import { DataBaseRepository } from '../repositories/json.repository.js';

const database = new DataBaseRepository('database/ferreteria.db.json');

export const ProductController = {
  getById: async (req, res) => {
    const idParam = req.params.id;
    console.log(`Este es el idParam: ${idParam}`);

    try {
      const responseData = await database.getById(idParam);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe el producto',
        payload: responseData,
      });

      return;
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: `No existe el producto con el id ${idParam}`,
      });
      return;
    }
  },

  getByIdBody: async (req, res) => {
    const { id } = req.body;

    try {
      const responseData = await database.getById(id);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe el producto',
        payload: responseData,
      });

      return;
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: `No existe el producto con el id ${id}`,
      });
      return;
    }
  },

  createProduct: async (req, res) => {
    const { name, descripcion, cantidad, tags } = req.body;
    const newProduct = new Product(name, descripcion, cantidad, tags);
    const response = await database.createProduct(newProduct);

    res.json({
      status: 200,
      OK: true,
      message: 'Producto creado',
      payload: response,
    });
  },
};

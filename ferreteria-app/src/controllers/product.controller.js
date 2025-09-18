import { Product } from '../models/product.model.js';
import { DataBaseRepository } from '../repositories/json.repository.js';

const database = new DataBaseRepository('database/ferreteria.db.json');

export const ProductController = {
  getAllData: async (req, res) => {
    const products = await database.getAllData();
    const productsObjectArray = products.map(
      (product) =>
        new Product(
          product?.name,
          product?.descripcion,
          product?.cantidad,
          product?.tags,
          product?.id,
        ),
    );

    res.json({
      OK: true,
      message: 'Listado de productos disponible solo para el admin',
      payload: productsObjectArray,
    });
  },
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
    console.log(req.body);

    const { id, name, descripcion, cantidad, tags } = req.body;
    const newProduct = new Product(name, descripcion, cantidad, tags, id);
    const response = await database.createProduct(newProduct);

    res.json({
      status: 200,
      OK: true,
      message: 'Producto creado',
      payload: response,
    });
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const producto = await database.getById(id);

      database.deleteProduct(producto);

      res.json({
        status: 200,
        OK: true,
        msg: `El producto: ${producto.id} fue eliminado de la base de datos`,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { descripcion, cantidad } = req.body;
    try {
      const producto = await database.getById(id);

      producto.descripcion = descripcion;
      producto.cantidad = cantidad;

      const { oldDataProduct, newDataProduct } = await database.updateProduct(producto);

      res.json({
        status: 200,
        OK: true,
        oldDataProduct,
        newDataProduct,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },
};

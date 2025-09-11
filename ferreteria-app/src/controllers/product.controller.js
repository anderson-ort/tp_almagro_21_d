import { DataBaseRepository } from '../repositories/json.repository.js';

const database = new DataBaseRepository('../../database/ferreteria.db.json');

export const ProductController = {
  getById: async (req, res) => {
    const idParam = req.params.id;
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
};

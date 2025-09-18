import fs from 'fs/promises';
import { Product } from '../models/product.model.js';

export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, { encoding: 'utf8' });
    return await JSON.parse(data);
  }

  async getById(idParam) {
    let data = await this.getAllData();

    if (!data) {
      throw new Error('Esta vacio');
    }

    const filteredData = data.filter((product) => product.id === idParam);

    console.log(filteredData);

    if (!filteredData || filteredData.length === 0)
      throw new Error(`No existe este producto: ${idParam}`);

    const objetoPlain = filteredData[0];

    const producto = new Product(
      objetoPlain.nombre,
      objetoPlain?.descripcion,
      objetoPlain.cantidad,
      objetoPlain.tags,
      objetoPlain.id,
    );

    return producto;
  }

  async createProduct(product) {
    let data = await this.getAllData();

    data.push(product);

    await fs.writeFile(this.path, JSON.stringify(data, null, 2));

    return {
      idProduct: product.id,
    };
  }

  // Borrar

  async deleteProduct(product) {
    const { id } = product;

    let data = await this.getAllData();

    const filteredData = data.filter((producto) => producto.id !== id);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return {
      idProduct: id,
    };
  }

  // Actualizar
  async updateProduct(product) {
    const { id } = product;

    let data = await this.getAllData();

    const filteredData = data.filter((producto) => producto.id !== id);
    const oldDataProduct = data.filter((producto) => producto.id === id);

    filteredData.push(product);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return { oldDataProduct, newDataProduct: product };
  }
}

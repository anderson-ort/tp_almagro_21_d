import { randomBytes } from 'crypto';

export class Product {
  constructor(nombre, descripcion, cantidad, tags) {
    this.id = randomBytes(4).toString('hex');
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.tags = tags;
  }
}

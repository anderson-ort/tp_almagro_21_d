import { ProductModel } from "../models/Product.Mongoose.js";

export class ProductRepositoryMongoose {

    constructor(productModel = ProductModel) {
        this.ProductModel = productModel;
    }

    // Obtener todos los productos
    getAll = async () => {
        try {
            return await this.ProductModel.find({});
        } catch (error) {
            console.error('Error obteniendo todos los productos:', error);
            throw new Error('No se pudieron obtener los productos');
        }
    }

    // Obtener un producto por ID
    getOne = async (id) => {
        try {
            const product = await this.ProductModel.findById(id);
            if (!product) throw new Error(`Producto con id ${id} no encontrado`);
            return product;
        } catch (error) {
            console.error(`Error obteniendo producto con id ${id}:`, error);
            throw new Error('Error al obtener el producto');
        }
    }

    // Crear un nuevo producto
    createOne = async ({ nombre, precio, descripcion }) => {
        try {
            const nuevoProducto = await this.ProductModel.create({
                nombre,
                precio,
                descripcion
            });
            return nuevoProducto;
        } catch (error) {
            console.error('Error creando producto:', error);
            throw new Error('No se pudo crear el producto');
        }
    }

    // Actualizar un producto por ID
    updateOne = async (id, { nombre, precio, descripcion }) => {
        try {
            const productoActualizado = await this.ProductModel.findByIdAndUpdate(
                id,
                { nombre, precio, descripcion },
                { new: true }
            );

            if (!productoActualizado)
                throw new Error(`Producto con id ${id} no encontrado`);

            return productoActualizado;
        } catch (error) {
            console.error(`Error actualizando producto con id ${id}:`, error);
            throw new Error('No se pudo actualizar el producto');
        }
    }

    // Eliminar un producto por ID
    deleteOne = async (id) => {
        try {
            const productoEliminado = await this.ProductModel.findByIdAndDelete(id);
            if (!productoEliminado)
                throw new Error(`Producto con id ${id} no encontrado`);
            return productoEliminado;
        } catch (error) {
            console.error(`Error eliminando producto con id ${id}:`, error);
            throw new Error('No se pudo eliminar el producto');
        }
    }
}

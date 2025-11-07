import { RepositoryFactory } from "../repository/RepositoryFactory.js";

const ProductRepository = RepositoryFactory.getRepository();

export const ProductController = {
	// Obtener todos los productos
	getAllProducts: async (request, response) => {
		try {
			const products = await ProductRepository.getAll();

			response.status(200).json({
				message: "OK",
				payload: products,
			});
		} catch (error) {
			console.error("Error al obtener los productos:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Obtener producto por ID
	getById: async (request, response) => {
		try {
			const { id } = request.params;
			const product = await ProductRepository.getOne(id);

			if (!product) {
				return response.status(404).json({ error: "Producto no encontrado" });
			}

			response.status(200).json({
				message: "OK",
				payload: product,
			});
		} catch (error) {
			console.error("Error al obtener producto por ID:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Crear producto desde JSON (body)
	createByJson: async (request, response) => {
		try {
			const { nombre, precio, descripcion } = request.body;

			if (!nombre || !precio) {
				return response.status(400).json({ error: "Faltan campos requeridos" });
			}

			const newProduct = await ProductRepository.createOne({
				nombre,
				precio,
				descripcion,
			});

			response.status(201).json({
				message: "Producto creado correctamente",
				payload: newProduct,
			});
		} catch (error) {
			console.error("Error al crear producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Actualizar producto desde JSON (body)
	updateByJson: async (request, response) => {
		try {
			const { id, nombre, precio, descripcion } = request.body;

			if (!id) {
				return response.status(400).json({ error: "El ID del producto es obligatorio" });
			}

			const updated = await ProductRepository.updateOne(id, {
				nombre,
				precio,
				descripcion,
			});

			response.status(200).json({
				message: "Producto actualizado correctamente",
				payload: updated,
			});
		} catch (error) {
			console.error("Error al actualizar producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},

	// Eliminar producto por ID
	deleteById: async (request, response) => {
		try {
			const { id } = request.params;

			const deleted = await ProductRepository.deleteOne(id);

			response.status(200).json({
				message: "Producto eliminado correctamente",
				payload: deleted,
			});
		} catch (error) {
			console.error("Error al eliminar producto:", error.message);
			response.status(500).json({ error: "Error interno del servidor" });
		}
	},
};

import DatabaseFactory from "../databases/DatabaseFactory.js";
import ProductDto from "../dto/ProductDTO.js";


export default class ProductRepositorySupabase {
    constructor() {
        this.init()
    }

    async init() {
        this.supabase = await DatabaseFactory.getConnection();
    }

    // Obtener todos los productos
    async getAll() {
        const { data, error } = await this.supabase
            .from("productos")
            .select("*");

        if (error) throw new Error(error.message);

        return data.map(producto => ProductDto.fromDataBase(producto));
    };

    // Obtener un producto por ID
    getOne = async (id) => {
        const { data, error } = await this.supabase
            .from("productos")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);

        return ProductDto.fromDataBase(data);
    };

    // Crear un nuevo producto
    createOne = async ({ nombre, precio, descripcion }) => {
        const { data, error } = await this.supabase
            .from("productos")
            .insert([{ nombre, precio, descripcion }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        return ProductDto.fromDataBase(data);
    };

    // Actualizar un producto por ID
    updateOne = async (id, { nombre, precio, descripcion }) => {
        const { data, error } = await this.supabase
            .from("productos")
            .update({ nombre, precio, descripcion })
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return ProductDto.fromDataBase(data);
    };

    // Eliminar un producto por ID
    deleteOne = async (id) => {
        const { data, error } = await this.supabase
            .from("productos")
            .delete()
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return ProductDto.fromDataBase(data);
    };
}

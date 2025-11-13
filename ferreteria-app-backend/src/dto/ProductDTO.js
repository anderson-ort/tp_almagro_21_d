export default class ProductDto {

    static fromDataBase(product) {
        return {
            id: product?.id ?? product._id,
            nombre: product.nombre.toUpperCase(),
            precio: `$ ${product.precio} ARGS`
        }
    }

}
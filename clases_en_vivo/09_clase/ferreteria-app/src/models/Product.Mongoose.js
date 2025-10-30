import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const productSchema = new Schema({
    nombre: { 
        type: String, 
        maxlength: 250, 
        default: "Producto no definido" 
    },
    precio: { 
        type: Number,  // Corregido: era "typeof" en lugar de "type"
        required: true // Corregido: era "require" en lugar de "required"
    },
    descripcion: { 
        type: String, 
        default: "Producto no definido" 
    }
}, {
    collection: "products", // tableName → collection
    versionKey: false,  // desactiva "__v"
    timestamps: true // Opcional: agrega createdAt y updatedDate automáticamente
})

export const ProductModel = mongoose.model("Product", productSchema);
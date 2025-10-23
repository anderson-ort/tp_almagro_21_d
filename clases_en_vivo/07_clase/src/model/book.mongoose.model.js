
import mongoose from 'mongoose'
import { Schema } from 'mongoose'


const bookSchema = new Schema(
  {
    // Sequelize: name (STRING(200), defaultValue: 'Unknown', allowNull: true)
    name: {
      type: String,
      maxlength: 200,
      default: "Unknown",
    },
    // Sequelize: created_date (DATEONLY, defaultValue: NOW)
    created_date: {
      type: Date,
      default: Date.now,
    },
    // Sequelize: category (STRING(200), allowNull: true)
    category: {
      type: String,
      maxlength: 200,
    },
  },
  {
    collection: "book", // tableName → collection
    versionKey: false,  // desactiva "__v"
  }
);

// Crea el modelo
export const BookModel = mongoose.model("Book", bookSchema);

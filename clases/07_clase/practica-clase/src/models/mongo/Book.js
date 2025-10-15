import mongoose from "mongoose"

const { Schema, model } = mongoose

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200,
    },
    author: {
        type: String,
        maxlength: 100,
    },
    rentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // referencia a la colección 'users'
    },
    rentedAt: {
        type: Date,
    }
}, {
    collection: 'books',
    timestamps: false,
});


export const Book = model('Book', bookSchema);

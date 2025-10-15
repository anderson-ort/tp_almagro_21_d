import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    },
}, {
    collection: 'users',
    timestamps: false,  // Si no querés timestamps automáticos
});


export const User = model('User', userSchema);

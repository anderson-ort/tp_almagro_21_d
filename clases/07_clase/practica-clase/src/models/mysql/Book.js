import { sequelize } from "../../databases/sequelize.mysql.cnx.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(100)
    },
    rentedAt: {
        type: DataTypes.DATE,
        field: 'rented_at' // mapeamos al nombre de columna en la DB
    }
}, {
    tableName: 'books',
    timestamps: false
});


Book.belongsTo(User, {
    foreignKey: 'rented_by',
    as: 'renter'
});

User.hasMany(Book, {
    foreignKey: 'rented_by',
    as: 'books'
});


export default Book;

import { sequelize } from "../../databases/sequelize.mysql.cnx.js";
import { DataTypes } from "sequelize";
import Book from "./book.js";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;
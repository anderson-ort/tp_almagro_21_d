import { DataTypes } from "sequelize"
import { sequelize } from "../databases/mysql.cnx.js"

export const BookModel = sequelize.define(
    'Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(200),
        defaultValue: 'Unknown',
        allowNull: true
    },
    created_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    category: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
}, {
    tableName: 'book',
    timestamps: false
}

)



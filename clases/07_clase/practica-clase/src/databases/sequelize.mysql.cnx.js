import { Sequelize } from "sequelize"
import { config } from "../config/config.js"
export const sequelize = new Sequelize(
    config.MYSQL_DATABASE,
    config.MYSQL_USER,
    config.MYSQL_PASSWORD,
    { host: "127.0.0.1", dialect: "mysql" }
)
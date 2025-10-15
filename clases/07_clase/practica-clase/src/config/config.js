import dotenv from 'dotenv';
dotenv.config();

const {
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MONGO_URI
} = process.env

export const config = {
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MONGO_URI
}

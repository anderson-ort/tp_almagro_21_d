import dotenv from 'dotenv'

dotenv.config()


const {
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_HOST,
    MYSQL_PORT,
    MONGO_URI,
    
    DIALECT,
    SERVER_PORT,
    SERVER_HOST
} = process.env


export const config ={
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_HOST,
    MYSQL_PORT,
    MONGO_URI,
    DIALECT,
    SERVER_PORT,
    SERVER_HOST
}
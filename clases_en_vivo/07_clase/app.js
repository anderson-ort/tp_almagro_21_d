import { config } from "./src/config/config.js";
import mongooseConnectionInstance from "./src/databases/mongo.cnx.js";
import { sequelize } from "./src/databases/mysql.cnx.js";
import server from "./src/server.js";

const runServer = async () =>{
    try {
        await sequelize.authenticate()
        await mongooseConnectionInstance.connect()
        
        console.log(`Conexion extablecida con: ${config.MYSQL_HOST}`);
        
        server.listen(
            config.SERVER_PORT,
            config.SERVER_HOST,
            console.log(`
                Server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}
            `)

        )

    } catch (error) {
        
        console.log(`Error en : ${config.MYSQL_HOST}`, error.message);
    }

}

runServer()
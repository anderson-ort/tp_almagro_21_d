import { config } from "../config/config.js";
import MongooseConnection from "./mongo.cnx.js";
import SupaBaseConnection from "./supabase.cnx.js";



export default class DatabaseFactory {

    static async connectMongo(cnx) {
        await cnx.connect()
    }

    static createConnection(databaseType) {

        switch (databaseType?.toLowerCase()) {
            case 'mongoose':
                const mongo = new MongooseConnection();
                DatabaseFactory.connectMongo(mongo)

            case 'supabase':
                return SupaBaseConnection.connect();

            default:
                throw new Error(`Tipo de base de datos no soportado: ${databaseType}`);
        }
    }

    static async getConnection() {
        const databaseType = config.DATABASE ?? 'mongoose';
        return DatabaseFactory.createConnection(databaseType);
    }

    
}


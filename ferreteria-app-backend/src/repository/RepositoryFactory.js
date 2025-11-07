import { config } from "../config/config.js";
import { ProductRepositoryMongoose } from "./Product.Mongo.Repository.js";
import ProductRepositorySupabase from "./Product.Supabase.Repository.js";

export class RepositoryFactory {
    static createRepositoryProvider(databaseType) {
        switch (databaseType?.toLowerCase()) {
            case 'mongoose':
                return new ProductRepositoryMongoose();

            case 'supabase':
                return new ProductRepositorySupabase();

            default:
                throw new Error(`Tipo de base de datos no soportado: ${databaseType}`);
        }
    }


    static getRepository() {
        const databaseType = config.DATABASE ?? "mongoose"

        return RepositoryFactory.createRepositoryProvider(databaseType)
    }

}
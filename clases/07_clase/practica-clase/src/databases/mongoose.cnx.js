import mongoose from 'mongoose';
import { config } from '../config/config.js';

class MongooseConnection {
    constructor() {
        this.connection = null;
    }

    async connect() {
        if (this.connection) {
            return this.connection;
        }
        try {
            await mongoose.connect(config.MONGO_URI, {
                dbName: 'ort-database',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            this.connection = mongoose.connection;
            console.log('✅ Mongoose connected');
            return this.connection;
        } catch (err) {
            console.error('❌ Error connecting to Mongoose:', err);
            throw err;
        }
    }
}

const mongooseConnectionInstance = new MongooseConnection();

export default mongooseConnectionInstance;

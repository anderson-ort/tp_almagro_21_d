import express from "express"
import BookRouter from "./routes/BookRouter.js"
import { sequelize } from "./databases/sequelize.mysql.cnx.js"
import mongooseConnectionInstance from "./databases/mongoose.cnx.js"

const PORT = process.env.PORT ?? 3100
const app = express()

app.use(express.json())

app.use("/api/book", BookRouter)



const startServer = async () => {
    try {
        // await sequelize.authenticate();
        await mongooseConnectionInstance.connect();

        console.log('✅ Conectado a la base de datos en Mongo Atlas');
        // console.log('✅ Conectado a la base de datos MySQL');
        // await sequelize.sync(); // sincroniza modelos

        app.listen(PORT, () => {
            console.log(`🚀 Server running: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar a la DB:', error);
    }
};

startServer();

export default app;
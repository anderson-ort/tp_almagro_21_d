// import server from "./server-http-nativo/server.js";
import server from "./server-express/server.js";

const PORT = 3001

server.listen(
    PORT, () => {
        console.log(`Estoy escuchando por medio de: http://127.0.0.1:${PORT}`);
    }
)
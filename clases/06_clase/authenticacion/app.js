import app from "./src/server.js";

const PORT = 3000;
const HOST = "127.0.0.1";


app.listen(PORT, () => {
  const msg = `Servidor corriendo en http://${HOST}:${PORT}
    Endpoints disponibles:
    - GET /
    - GET /productos (Basic Auth)
    - POST /login (JWT)
    - GET /pedidos (JWT)
    - GET /inventario (API Key)`
  console.log(msg)
});

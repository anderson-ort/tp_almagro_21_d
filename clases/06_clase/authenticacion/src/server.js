import express from "express"
import { authMiddleware } from "./auth/basicAuth.js"
import { generateToken } from "./auth/tokenAuth.js";
import { validateToken } from "./auth/tokenAuth.js";
import { apiKeyMiddleware } from "./auth/apiKey.js";

const app = express();

app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send(`
    <h1>API de Ejemplo para Clase Node.js</h1>
    <ul>
      <li><strong>Basic Auth:</strong> GET /productos</li>
      <li><strong>JWT:</strong> POST /login → GET /pedidos</li>
      <li><strong>API Key:</strong> GET /inventario</li>
    </ul>
    <p>Usar Postman o cURL para probar los endpoints</p>
  `);
});


app.post('/login', generateToken);


app.get('/productos', authMiddleware, (req, res) => {
  res.json([{ id: 1, nombre: "Laptop Gamer" }, { id: 2, nombre: "Teclado Mecánico" }]);
});

app.get('/pedidos', validateToken, (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado',
    usuario: req.user, // accedés al payload del token
    payload: [{ id: 1, total: 100 }, { id: 2, total: 200 }]
  });
});

app.get('/inventario', apiKeyMiddleware, (req, res) => {
  res.json([
    { producto: "Monitor 24\"", stock: 50 },
    { producto: "Mouse Inalámbrico", stock: 120 }
  ]);
});


export default app;

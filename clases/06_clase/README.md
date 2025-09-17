
# Clase: Desarrollo Backend con Node.js y Express

## Objetivo General:
Entender y aplicar conceptos fundamentales del desarrollo backend con Node.js: rutas, middlewares, autenticación básica y conexión a bases de datos (MongoDB y SQL Server) con y sin ORM.

---

## PARTE 1: Routing en Express

### Teoría:
- **¿Qué es Express?** Framework minimalista de Node.js.
- **¿Qué es el Routing?** Mecanismo para gestionar las solicitudes entrantes.
- **Formas de definir rutas:**
  ```js
  app.get('/users', handler);
  router.post('/login', handler);
  ```
- **Normalización del routing:**
  - Uso de `express.Router()`
  - Separación por archivos/modularización
  - Patrón MVC o Clean Architecture

### Práctica:
1. Crear una API básica de usuarios con rutas para `GET /users`, `POST /users`, `GET /users/:id`
2. Modularizar rutas en carpeta `/routes/users.js`

```js
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

module.exports = router;
```

---

## PARTE 2: Middlewares en Express

### Teoría expandida:

Un **middleware** en Express es una función que tiene acceso al `request`, `response` y al siguiente middleware a ejecutar. Se utiliza para **interceptar, modificar o validar** solicitudes y respuestas.

```js
(req, res, next) => { /* lógica */ next(); }
```

### Tipos de Middlewares:

| Tipo         | Descripción                                           | Ejemplo práctico                |
|--------------|-------------------------------------------------------|---------------------------------|
| Global       | Se ejecuta en todas las rutas                         | Logging, sanitización de input |
| De Ruta      | Aplicado solo a ciertas rutas                         | Validar campos en `POST /user` |
| De Error     | Captura errores en la ejecución                       | Manejo centralizado de errores |

### Orden de ejecución:
El orden importa mucho. Express ejecuta los middlewares en el orden en que se definieron.

---

### Ejemplo 1: Middleware de limpieza y validación de campos

**Objetivo:** Normalizar inputs y validar que estén presentes.

#### `middlewares/cleanAndValidate.js`

```js
const cleanAndValidate = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Limpieza
  req.body.name = name.trim().toLowerCase();
  req.body.email = email.trim().toLowerCase();

  next();
};

module.exports = cleanAndValidate;
```

#### Uso en ruta:

```js
const express = require('express');
const app = express();
const cleanAndValidate = require('./middlewares/cleanAndValidate');

app.use(express.json());

app.post('/register', cleanAndValidate, (req, res) => {
  res.json({ message: 'Usuario procesado', data: req.body });
});
```

#### Caso de uso:
- Validar que un `POST /register` no reciba campos vacíos y que la info se guarde en formato estandarizado.
- Ejemplo de entrada:
```json
{ "name": "  ANA  ", "email": " ANA@MAIL.COM " }
```
Resultado procesado:
```json
{ "name": "ana", "email": "ana@mail.com" }
```

---

### Ejemplo 2: Middleware de autenticación básica (mock)

**Objetivo:** Proteger una ruta con un "token" simulado.

#### `middlewares/mockAuth.js`

```js
const mockAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== "Bearer abc123") {
    return res.status(403).json({ error: "Token inválido o faltante" });
  }

  next();
};

module.exports = mockAuth;
```

#### Uso en ruta:

```js
const mockAuth = require('./middlewares/mockAuth');

app.get('/profile', mockAuth, (req, res) => {
  res.json({ user: "andru", role: "admin" });
});
```

---

### Ejercitación en clase

Objetivo: Que el estudiante aplique la lógica de middlewares para validar, limpiar y proteger rutas de una API sencilla.

#### Ejercicio 1: Middleware de validación y limpieza en `/login`

**Descripción:**
Crear una ruta `POST /login` que:
- Reciba `username` y `password` en el body.
- Aplique middleware para:
  - Validar que los campos existan.
  - Limpiar espacios (`trim`) y pasar a minúsculas (`toLowerCase`).
- Verifique que el usuario sea `"admin"` y la contraseña `"1234"`, devolviendo un mensaje de éxito o error.

**Objetivo de aprendizaje:**
- Validar input.
- Reutilizar middlewares.
- Encapsular lógica común.

---

#### Ejercicio 2: Ruta protegida con token simulado (mock)

**Descripción:**
Crear una ruta `GET /admin` que:
- Solo sea accesible si el cliente incluye un header:
  ```
  Authorization: Bearer abc123
  ```
- Devuelva `"Acceso concedido"` si el token es válido, o `"No autorizado"` si falta o es incorrecto.

**Objetivo de aprendizaje:**
- Proteger rutas con middlewares personalizados.
- Comprender el uso de headers en autenticación.

---

#### Ejercicio 3: Middleware global de logging

**Descripción:**
Crear un middleware global que:
- Imprima en consola la URL y método de cada solicitud.
- Ejemplo de salida:
  ```
  [GET] /profile
  ```

**Objetivo de aprendizaje:**
- Aplicar middlewares a todas las rutas.
- Entender el orden de ejecución y cómo monitorizar una API.

---

#### Ejercicio 4: Encadenamiento de middlewares

**Descripción:**
Para la ruta `POST /register`, aplicar 2 middlewares en cadena:
1. `cleanAndValidate`: limpia y valida el input.
2. `mockAuth`: verifica si hay token válido.

La ruta sólo responderá si ambos middlewares se cumplen.

**Objetivo de aprendizaje:**
- Encadenar múltiples middlewares.
- Entender el flujo de validaciones previas a ejecutar la lógica principal.

---

## PARTE 3: Basic Token Auth

### Teoría esencial sobre autenticación en APIs

1. **Autenticación Básica**  
   Mecanismo simple que envía credenciales en cada solicitud mediante el header `Authorization` (codificado en Base64). Ideal para prototipos rápidos pero requiere HTTPS para producción.

2. **JWT (JSON Web Tokens)**  
   Sistema stateless que genera tokens firmados digitalmente. Ofrece ventajas en escalabilidad y control de acceso granular mediante claims. Los tokens tienen caducidad configurable.

3. **API Keys**  
   Identificador único asignado a cada cliente. Se implementa mediante headers personalizados o parámetros de query. Común en servicios de terceros y microservicios.

---

### Tabla comparativa: métodos de autenticación

| Característica          | Basic Auth                          | JWT                                  | API Keys                  |
|-------------------------|-------------------------------------|--------------------------------------|---------------------------|
| Seguridad               | Baja (sin HTTPS)                    | Alta (firma digital)                 | Media                     |
| Implementación          | Muy simple                          | Moderada                             | Simple                    |
| Escalabilidad           | Limitada                            | Excelente                            | Buena                     |
| Gestión de sesiones     | Estado mantenido                    | Stateless                            | Stateless                 |
| Casos de uso            | APIs internas/privadas              | Apps escalables                      | Microservicios/SaaS       |
| Vulnerabilidades        | Sniffing de credenciales            | Token theft                          | Key leakage               |

---

### Ejemplos prácticos para implementación en clase

#### 1. Basic Authentication (Ruta GET protegida)
```javascript
const basicAuth = require('basic-auth');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'admin123') {
    res.set('WWW-Authenticate', 'Basic realm="Acceso restringido"');
    return res.status(401).send('Autenticación requerida');
  }
  next();
};

// Ruta protegida
app.get('/productos', authMiddleware, (req, res) => {
  res.json([{id: 1, nombre: "Laptop Gamer"}]);
});
```

#### 2. JWT (Login + Ruta protegida)
```javascript
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Generación de token
app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  if (usuario === 'docente' && clave === 'claveSegura') {
    const token = jwt.sign({ rol: 'admin' }, 'claveSecreta', { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Credenciales inválidas' });
});

// Middleware de verificación
app.get('/pedidos', expressJwt({ secret: 'claveSecreta', algorithms: ['HS256'] }), (req, res) => {
  res.json([{id: 101, total: 299.99}]);
});
```

#### 3. API Keys (Ruta GET con validación)
```javascript
// Validación de API Key
const apiKeyMiddleware = (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (key !== 'KEY-UNIVERSIDAD-2024') return res.status(403).send('Acceso denegado');
  next();
};

// Ruta de inventario
app.get('/inventario', apiKeyMiddleware, (req, res) => {
  res.json([{producto: "Monitor 24\"", stock: 50}]);
});
```

---

### Recomendaciones

1. **Seguridad en prácticas:**
   - Usar siempre HTTPS en evaluaciones prácticas
   - Implementar variables de entorno para claves
   - Configurar tiempos de expiración en JWT (1h para desarrollo)

2. **Ejercicios propuestos:**
   - Implementar sistema de roles con JWT
   - Crear middleware de rate-limiting para API Keys
   - Comparar tiempos de respuesta entre métodos

3. **Herramientas de testing:**
   ```
   # Test JWT
   curl -H "Authorization: Bearer <token>" http://localhost:3000/pedidos

   # Test API Key
   curl -H "x-api-key: KEY-UNIVERSIDAD-2024" http://localhost:3000/inventario
   ```

---

## PARTE 4: Conexión a Bases de Datos (Optional: Ver si se llega si no para la proxima clase)

### Teoría:
- Comparativa SQL vs NoSQL
- ¿Qué es un ORM?
- Drivers directos vs ORM

### MongoDB:
- Librerías: `mongodb` (nativo) y `mongoose` (ORM)

#### Sin ORM:
```js
const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);
await client.connect();
const db = client.db("testdb");
const users = await db.collection("users").find().toArray();
```

#### Con Mongoose:
```js
const mongoose = require("mongoose");
await mongoose.connect(uri);
const User = mongoose.model("User", new Schema({ name: String }));
```

### SQL Server:
- Librerías: `mssql` (driver nativo), `sequelize` (ORM compatible)

#### Sin ORM:
```js
const sql = require('mssql');
await sql.connect(config);
const result = await sql.query('SELECT * FROM Users');
```

#### Con Sequelize:
```js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('mssql://user:pass@host:port/db');
const User = sequelize.define("User", { name: DataTypes.STRING });
await sequelize.sync();
```

---

## Ejercicios propuestos

### Ejercicio 1:
Modularizar una API de productos con rutas RESTful y middlewares de validación de campos.

### Ejercicio 2:
Agregar autenticación básica a una API existente. Rechazar solicitudes no autenticadas.

### Ejercicio 3:
Crear conexión a MongoDB con `mongoose` y modelar una colección `alumnos` con los campos: `nombre`, `edad`, `materias`.

### Ejercicio 4:
Conectar a SQL Server y realizar un CRUD sin ORM para una tabla `clientes`.

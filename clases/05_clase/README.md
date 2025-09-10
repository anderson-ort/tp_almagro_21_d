# Clase: Introducción a APIs en el Desarrollo de Software

## Objetivos de la clase
- Entender qué es una API y su rol en el ecosistema digital
- Conocer los diferentes tipos de APIs
- Comprender el modelo RESTful y cómo se implementa
- Introducción a arquitecturas comunes (MVC y microservicios)
- Implementar una API básica en Node.js con Express
- Desarrollar un proyecto práctico: API de gestión de carpetas y archivos

---

## Parte Teórica: ¿Qué es una API?

Una **API (Application Programming Interface)** es un conjunto de reglas y protocolos que permite que dos aplicaciones se comuniquen entre sí. Define cómo los diferentes componentes de software deben interactuar, especificando los tipos de solicitudes que se pueden hacer, cómo se hacen, los formatos de datos que se utilizan y las convenciones que se deben seguir.

---

## Tipos de APIs con Ejemplos en JavaScript (Node.js + Express)

### 1. APIs Públicas
Disponibles para cualquier desarrollador sin restricciones.

```javascript
// Ejemplo: Consumo de API pública de Pokémon
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then(res => res.json())
  .then(data => console.log(data.name));
```

### 2. APIs Privadas
De uso exclusivo interno dentro de una organización.

```javascript
// Endpoint privado con verificación de token
app.get('/private', (req, res) => {
  const token = req.headers.authorization;
  if (token === '123456') {
    res.send('Acceso autorizado');
  } else {
    res.status(403).send('Acceso denegado');
  }
});
```

### 3. APIs de Partners
Acceso restringido a terceros autorizados o socios comerciales.

```javascript
// Verificación con clave API para partners
app.get('/partner-data', (req, res) => {
  const apiKey = req.query.apiKey;
  if (apiKey === 'clave-partner') {
    res.send('Datos compartidos');
  } else {
    res.status(401).send('No autorizado');
  }
});
```

### 4. APIs Compuestas
Unifican múltiples endpoints en una sola respuesta para optimizar consultas.

```javascript
// Respuesta compuesta que agrupa datos de diferentes fuentes
app.get('/user-dashboard', async (req, res) => {
  const user = { id: 1, name: "Ana" };
  const notifications = [{ msg: "Nuevo mensaje" }];
  res.json({ user, notifications });
});
```

### 5. API RESTful
Organiza recursos utilizando métodos HTTP estándar.

**¿Qué es REST?**
REST (Representational State Transfer) es un estilo de arquitectura para diseñar servicios web, definido por Roy Fielding en el año 2000. Propone principios que permiten que diferentes sistemas se comuniquen usando HTTP de forma sencilla, predecible y escalable.

**¿Qué es RESTful?**
Se refiere a sistemas que siguen los principios y restricciones de REST.

**¿Qué es una API RESTful?**
Es un conjunto de endpoints accesibles mediante HTTP que permiten operaciones CRUD (Create, Read, Update, Delete) de manera estructurada.

Ejemplo de operaciones RESTful:
```javascript
// CRUD básico con Express
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => { /* crear tarea */ });
app.put('/tasks/:id', (req, res) => { /* actualizar tarea */ });
app.delete('/tasks/:id', (req, res) => { /* eliminar tarea */ });
```

### 6. API SOAP
Protocolo más estructurado basado en XML, menos común en JavaScript moderno.

```xml
<!-- Ejemplo SOAP en XML -->
<soap:Envelope>
  <soap:Body>
    <getUserData xmlns="http://example.com/api"/>
  </soap:Body>
</soap:Envelope>
```

### 7. Webhooks
Mecanismo donde una aplicación envía información automáticamente cuando ocurre un evento específico.

```javascript
// Recepción de webhook
app.post('/webhook', (req, res) => {
  console.log('Evento recibido:', req.body);
  res.sendStatus(200);
});
```

### 8. GraphQL
Lenguaje de consulta que permite a los clientes definir exactamente qué datos necesitan.

```javascript
// Consulta GraphQL
query {
  user(id: "1") {
    name
    email
  }
}
```

---

## APIs de Ejemplo para Práctica
- https://rickandmortyapi.com/
- https://swapi.dev/
- https://jsonplaceholder.typicode.com/
- https://fakeapi.platzi.com/
- https://api.escuelajs.co/graphql (GraphQL)

---

## RESTful: MVC vs Microservicios

### REST + MVC (Model-View-Controller)
Arquitectura que separa claramente la lógica de negocio, las rutas y los datos. Ideal para aplicaciones monolíticas pequeñas a medianas.

Estructura típica:
```
src/
├── controllers/
├── routes/
├── models/
└── index.js
```

### REST + Microservicios
Arquitectura donde cada componente es independiente y se comunica mediante APIs. Escalable e ideal para sistemas distribuidos.

---

## Arquitectura en Capas (Layered Architecture) para Node.js

La arquitectura en capas es un patrón de diseño que organiza el código en niveles con responsabilidades específicas, facilitando el mantenimiento, testing y escalabilidad.

### Capas típicas en una aplicación Node.js:

1. **Capa de Presentación (Controllers)**
   - Maneja las solicitudes HTTP
   - Valida datos de entrada
   - Devuelve respuestas al cliente

2. **Capa de Servicio (Services)**
   - Contiene la lógica de negocio
   - Orquesta operaciones entre diferentes componentes
   - No conoce detalles de HTTP o base de datos

3. **Capa de Acceso a Datos (Models/Repositories)**
   - Interactúa con la base de datos
   - Realiza operaciones CRUD
   - Aísla la lógica de persistencia

4. **Capa de Utilidades (Helpers/Utils)**
   - Funciones auxiliares reutilizables
   - Validaciones, formateo, etc.

### Beneficios:
- Separación clara de responsabilidades
- Código más mantenible y testeable
- Facilita el trabajo en equipo
- Permite cambiar implementaciones sin afectar otras capas

Ejemplo de estructura:
```
src/
├── controllers/    # Capa de presentación
├── services/       # Capa de servicio
├── models/         # Capa de acceso a datos
├── utils/          # Utilidades
└── config/         # Configuración
```

---

## Versionado de APIs

El versionado permite realizar mejoras sin romper integraciones existentes.

### Formas comunes de versionado:

**En la URL (más común):**
```http
GET /api/v1/users
POST /api/v2/orders
```

**En headers:**
```http
GET /users
Accept: application/vnd.miapi.v1+json
```

**En parámetros de query:**
```http
GET /users?version=1
```

### Implementación en Express:
```javascript
const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```

---

## Estructura Estándar de Respuestas JSON

Mantener una estructura consistente facilita el desarrollo y debugging.

### Formato recomendado:
```json
{
  "status": "success",
  "message": "Usuario creado con éxito",
  "data": {
    "id": 123,
    "nombre": "Andru"
  }
}
```

### Tipos de respuesta:
- **Éxito (200/201):** `status: "success"`, `data`, `message`
- **Error (400/404):** `status: "error"`, `message`, `errors` (opcional)
- **Error interno (500):** `status: "fail"`, `message`, `details` (opcional)

### Ejemplo en Express:
```javascript
// Respuesta exitosa
res.status(200).json({
  status: "success",
  message: "Lista de carpetas",
  data: ["carpeta1", "carpeta2"]
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "fail",
    message: "Error inesperado del servidor",
    details: err.message
  });
});
```

---

**Bibliografía:**
- BraveDeveloper - Conceptos de REST y RESTful
- Medium - Three Tier Architecture in Node.js
- Documentación oficial de Express.js y Node.js

# Clase: Introducción a Módulos, Web Servers y Middlewares en Node.js

## 1. Módulos en JavaScript: `require` e `import`

### CommonJS (`require`)
CommonJS es el sistema de módulos por defecto en Node.js. Utiliza `require` para importar y `module.exports` para exportar.

**Ejemplo de uso con CommonJS:**
```javascript
// archivo math.js
module.exports.sumar = (a, b) => a + b;
module.exports.restar = (a, b) => a - b;
```

```javascript
// archivo index.js
const math = require('./math');
console.log(math.sumar(2, 3)); // 5
```

### ESModules (`import`)
A partir de ES6, JavaScript introduce los ESModules, que usan `import` y `export`.

**Ejemplo de uso con ESModules:**
```javascript
// archivo math.mjs
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
```

```javascript
// archivo index.mjs
import { sumar } from './math.mjs';
console.log(sumar(2, 3)); // 5
```

Para usar ESModules en Node.js, en `package.json` hay que definir:
```json
{
  "type": "module"
}
```

## 2. package.json y package-lock.json

### package.json
Es un archivo que contiene información del proyecto, dependencias y scripts.
Se genera con:
```sh
npm init -y
```

Ejemplo de `package.json`:
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### package-lock.json
Este archivo bloquea las versiones exactas de las dependencias para evitar inconsistencias en diferentes instalaciones.

**Recursos adicionales:**
- [Bases y claves de npm package y package-lock.json](https://nicolas-seguro.medium.com/bases-y-claves-de-npm-package-package-lock-json-7af6c141d02d)
- [Documentación oficial de package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json)

### Comandos básicos de npm
```bash
npm init        # Crea un proyecto
npm search      # Búsqueda de paquetes
npm install     # Instala paquetes
npm uninstall   # Desinstala paquetes
npm list        # Listado del árbol de dependencias
npm outdated    # Lista de paquetes para actualizar
npm update      # Actualiza la versión del paquete
npm help        # Ayuda
```

## 3. ¿Qué es un Web Server?
Un **servidor web** es una aplicación que escucha peticiones HTTP y responde con datos. Puede servir archivos estáticos o manejar lógica de negocio.

Ejemplo de un servidor web básico con Node.js:
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola, mundo!');
});
server.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
```

## 4. ¿Qué es Express?
Express es un framework minimalista para Node.js que facilita la creación de servidores HTTP.

Instalación:
```sh
npm install express
```

## 5. Creando un Web Server con Express
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hola, mundo con Express!');
});

app.listen(3000, () => console.log('Servidor Express en http://localhost:3000'));
```

## 6. Middlewares en Express

### ¿Qué es un Middleware?
Un middleware es una función que se ejecuta antes de enviar una respuesta.

### Middlewares básicos en Express

#### 1. `express.json()`
Habilita el manejo de JSON en las peticiones.
```javascript
app.use(express.json());
```

#### 2. `express.urlencoded({ extended: true })`
Permite manejar datos enviados desde formularios.
```javascript
app.use(express.urlencoded({ extended: true }));
```

#### 3. `cors`
Maneja permisos de acceso entre dominios diferentes.
```sh
npm install cors
```
```javascript
const cors = require('cors');
app.use(cors());
```

### Tipos de Middlewares

#### 1. Middlewares de aplicación
Afectan a todas las rutas.

**Uso común:** Logging, CORS, autenticación global, parseo de body.

```javascript
const express = require('express');
const app = express();

// Middleware de aplicación: se ejecuta en TODAS las rutas
app.use((req, res, next) => {
  console.log(`[APP] ${req.method} ${req.url}`);
  next(); // Importante: continuar al siguiente middleware o ruta
});

app.get('/home', (req, res) => {
  res.send('Página principal');
});

app.get('/about', (req, res) => {
  res.send('Acerca de');
});
```

#### 2. Middlewares de enrutador
Se aplican solo a ciertas rutas con `express.Router()`.

**Uso común:** Agrupar middleware por recurso o módulo (usuarios, productos, etc.)

```javascript
const express = require('express');
const app = express();
const router = express.Router();

// Middleware específico del router
router.use((req, res, next) => {
  console.log(`[ROUTER] Ruta de usuario: ${req.method} ${req.url}`);
  next();
});

// Rutas asociadas al router de usuarios
router.get('/profile', (req, res) => {
  res.send('Perfil de usuario');
});

router.get('/settings', (req, res) => {
  res.send('Configuraciones del usuario');
});

// Asignar router a una ruta base
app.use('/user', router);

app.get('/', (req, res) => {
  res.send('Inicio');
});
```

#### 3. Middlewares de manejo de errores
Capturan y manejan errores en la aplicación.

**Uso común:** Centralizar el manejo de errores de toda la app.

```javascript
const express = require('express');
const app = express();

// Ruta que simula un error
app.get('/error', (req, res) => {
  throw new Error('Algo salió mal!');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).send('Ocurrió un error interno en el servidor.');
});
```

### Resumen de tipos de middleware

| Tipo                         | ¿Dónde se aplica?                  | Uso común                                     |
|------------------------------|-------------------------------------|-----------------------------------------------|
| Middleware de aplicación     | En todas las rutas                  | Logging, auth global, parseo de body          |
| Middleware de enrutador      | Solo en rutas específicas           | Agrupación por recursos (usuarios, productos) |
| Middleware de manejo de errores | En errores de cualquier parte de la app | Mostrar mensajes amigables, evitar crash      |

## 7. Request y Response en el contexto web

### Request (Petición)
Una **request** es un mensaje que un **cliente** (como un navegador) envía a un **servidor** para solicitar una acción o datos.

**Componentes de una Request:**
- **Método HTTP:** Define la acción que se desea realizar (GET, POST, PUT, DELETE)
- **URL:** La dirección del recurso que se está solicitando
- **Headers:** Información adicional sobre la petición
- **Body (opcional):** Datos que se envían junto con la petición

### Response (Respuesta)
Una **response** es el mensaje que el **servidor** envía de vuelta al **cliente** después de procesar la petición.

**Componentes de una Response:**
- **Código de estado HTTP:** Indica el resultado de la petición
- **Headers:** Información adicional sobre la respuesta
- **Body:** Contenido de la respuesta

**Recurso adicional:** [¿Qué es HTTP Request y Response?](https://robertomiguelz.blogspot.com/2018/02/que-es-http-request-y-response.html)

### Resumen visual

| Elemento   | Request                            | Response                            |
|------------|------------------------------------|-------------------------------------|
| Quién lo envía | Cliente (navegador, app, etc.)    | Servidor                            |
| Cuándo sucede | Cuando se solicita una acción     | Al responder a esa solicitud        |
| Contenido     | Método, URL, headers, body (opcional) | Código de estado, headers, body     |
| Ejemplo       | `GET /productos`                 | `200 OK` con listado de productos   |

## Challenge: Construyendo un API con Express

### Objetivo:
Crear un servidor web con Express que maneje rutas, use middlewares y devuelva respuestas JSON.

### Requisitos:
1. Crear un proyecto Node.js e inicializar `package.json`
2. Instalar y configurar Express
3. Implementar rutas para:
   - `GET /` → Devuelve un mensaje de bienvenida
   - `GET /chuckjokes` → Usando la [API de Chuck Norris jokes](https://api.chucknorris.io/jokes/random), hacer una petición y mostrar el chiste
   
4. Usar middlewares:
   - `express.json()` para parsear JSON
   - `express.urlencoded({ extended: true })` para datos de formularios
   - `cors` para permitir peticiones de otros dominios
   - **Bonus:** Middleware personalizado para loggear cada petición recibida
   - **Bonus:** Manejar errores con un middleware adecuado

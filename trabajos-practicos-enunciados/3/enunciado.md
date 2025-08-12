# TP3 – API REST con Servidor Express

## Descripción

Se debe crear un **servidor HTTP** basado en **Express** que escuche en el puerto **8080** y gestione el recurso `libros` a través de las siguientes rutas:

### Endpoints

- `GET /libros` → Obtiene todos los libros almacenados en un array en el servidor.
- `GET /libros/:id` → Obtiene un libro por su ID.
- `POST /libros` → Incorpora un nuevo libro.
- `PUT /libros/:id` → Actualiza un libro por su ID.
- `DELETE /libros/:id` → Borra un libro por su ID.

Cada libro será representado con una estructura **JSON**, almacenada en un array en memoria, con los siguientes campos:

```json
{
    "id": 1,
    "titulo": "1984",
    "autor": "George Orwell",
    "año": 1949
}
```

Además, el servidor debe contar con un **formulario público** para ingresar nuevos libros mediante el método `POST`.

Las rutas `GET` y `GET/:id` se pueden probar directamente en el navegador, mientras que `PUT` y `DELETE` se deben probar con **Postman**.

---

## Implementación en Node.js con Express

### Instalación de dependencias

```bash
npm init -y
npm install express body-parser cors nodemon
```

### Estructura del Proyecto

```
📁 tp3-api-rest-express
│── 📂 src
│   ├── 📂 controllers
│   │   ├── librosController.js
│   ├── 📂 routes
│   │   ├── librosRoutes.js
│   ├── 📂 models
│   │   ├── libroModel.js
│   ├── 📂 public
│   │   ├── index.html
│   ├── server.js
├── package.json
```

### Código del Servidor `server.js`

```js
const express = require('express');
const cors = require('cors');
const librosRoutes = require('./routes/librosRoutes');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/libros', librosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---

### Modelo `libroModel.js`

```js
let libros = [];

const obtenerTodos = () => libros;
const obtenerPorId = (id) => libros.find(libro => libro.id === id);
const agregarLibro = (libro) => libros.push(libro);
const actualizarLibro = (id, datos) => {
    const index = libros.findIndex(libro => libro.id === id);
    if (index !== -1) libros[index] = { ...libros[index], ...datos };
};
const borrarLibro = (id) => {
    libros = libros.filter(libro => libro.id !== id);
};

module.exports = { obtenerTodos, obtenerPorId, agregarLibro, actualizarLibro, borrarLibro };
```

---

### Controlador `librosController.js`

```js
const model = require('../models/libroModel');

exports.obtenerTodos = (req, res) => res.json(model.obtenerTodos());
exports.obtenerPorId = (req, res) => {
    const libro = model.obtenerPorId(parseInt(req.params.id));
    libro ? res.json(libro) : res.status(404).json({ error: 'Libro no encontrado' });
};
exports.agregarLibro = (req, res) => {
    const nuevoLibro = { id: Date.now(), ...req.body };
    model.agregarLibro(nuevoLibro);
    res.status(201).json(nuevoLibro);
};
exports.actualizarLibro = (req, res) => {
    model.actualizarLibro(parseInt(req.params.id), req.body);
    res.json({ mensaje: 'Libro actualizado' });
};
exports.borrarLibro = (req, res) => {
    model.borrarLibro(parseInt(req.params.id));
    res.json({ mensaje: 'Libro eliminado' });
};
```

---

### Rutas `librosRoutes.js`

```js
const express = require('express');
const controller = require('../controllers/librosController');
const router = express.Router();

router.get('/', controller.obtenerTodos);
router.get('/:id', controller.obtenerPorId);
router.post('/', controller.agregarLibro);
router.put('/:id', controller.actualizarLibro);
router.delete('/:id', controller.borrarLibro);

module.exports = router;
```

---

### Formulario `public/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Libro</title>
</head>
<body>
    <h2>Agregar un Libro</h2>
    <form id="libroForm">
        <input type="text" id="titulo" placeholder="Título" required>
        <input type="text" id="autor" placeholder="Autor" required>
        <input type="number" id="año" placeholder="Año" required>
        <button type="submit">Enviar</button>
    </form>
    <script>
        document.getElementById('libroForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                año: parseInt(document.getElementById('año').value)
            };
            await fetch('/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            alert('Libro agregado');
        });
    </script>
</body>
</html>
```

---

## Opcionales y Bonus

1. **Persistencia en archivo** usando `fs` para guardar libros en `libros.json`.
2. **Persistencia en base de datos** (MongoDB, PostgreSQL, SQLite).
3. **Autenticación y autorización** con `JWT`.
4. **Paginación y filtrado** de libros (`?autor=Orwell`, `?año=1949`).

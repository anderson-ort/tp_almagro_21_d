
# Clase: Callbacks, Promesas y File System Asíncrono en Node.js

## 1. Introducción
En esta clase, exploraremos el uso de **callbacks**, **promesas** y **async/await** en JavaScript. Además, trabajaremos con el módulo `fs` de Node.js para manejar archivos de manera asíncrona.

## 2. Callbacks
Un callback es una función que se pasa como argumento a otra función y se ejecuta después de que la operación asíncrona se haya completado.

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Datos recibidos");
    }, 2000);
}

fetchData((data) => {
    console.log(data);
});
```

## 3. Promesas
Las promesas proporcionan una mejor forma de manejar operaciones asíncronas.

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Datos recibidos");
        }, 2000);
    });
}

fetchData().then((data) => console.log(data)).catch((err) => console.error(err));
```

## 4. Async/Await
`async/await` permite escribir código asíncrono de manera más legible.

```javascript
async function fetchData() {
    return "Datos recibidos";
}

async function main() {
    const data = await fetchData();
    console.log(data);
}

main();
```

## 5. File System Asíncrono
Trabajaremos con el módulo `fs/promises` para leer y escribir archivos de manera asíncrona.

```javascript
import { writeFile, readFile } from 'fs/promises';

async function manejarArchivo() {
    try {
        await writeFile('data.txt', 'Hola, mundo!');
        const contenido = await readFile('data.txt', 'utf8');
        console.log(contenido);
    } catch (error) {
        console.error("Error manejando el archivo", error);
    }
}

manejarArchivo();
```

## 6. Challenge: Implementar un Repository en LocalStorage
**Objetivo:** Implementar una clase `LocalStorageRepository` para manejar almacenamiento en `localStorage` usando Promesas.

### Requisitos:
- Implementar los métodos `setItem`, `getItem`, `removeItem` y `clear`.
- Utilizar `async/await` para manejar las operaciones.

```javascript
class LocalStorageRepository {
    async setItem(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        });
    }

    async getItem(key) {
        return new Promise((resolve) => {
            const data = localStorage.getItem(key);
            resolve(data ? JSON.parse(data) : null);
        });
    }

    async removeItem(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    }

    async clear() {
        return new Promise((resolve) => {
            localStorage.clear();
            resolve();
        });
    }
}

(async () => {
    const repo = new LocalStorageRepository();
    await repo.setItem("user", { name: "Andru", age: 30 });
    console.log(await repo.getItem("user"));
    await repo.removeItem("user");
})();
```

## 7. Conclusión
En esta clase aprendimos a:
- Usar callbacks para manejar operaciones asíncronas.
- Utilizar promesas y `async/await` para mejorar la legibilidad del código.
- Trabajar con el sistema de archivos asíncrono en Node.js.
- Implementar un patrón Repository con `localStorage`.


Implementa mejoras en el `LocalStorageRepository`, como expiración de datos o manejo de errores.

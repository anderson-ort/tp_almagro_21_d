# TP2: FileSystem Sincrónico y Asincrónico

## Descripción

Escribir un proyecto en **Node.js** que realice las siguientes acciones:

1. Lea el archivo `package.json` y declare un objeto con el siguiente formato y datos:

```js
let info = {
    contenidoStr: (contenido del archivo leído en formato string),
    contenidoObj: (contenido del archivo leído en formato objeto),
    size: (tamaño en bytes del archivo)
};
```

2. Muestre por consola el objeto `info` luego de leer el archivo.
3. Guarde el objeto `info` en un archivo llamado `info.txt` dentro de la misma carpeta de `package.json`.
4. Incluir el manejo de errores.

## Implementación

La solución se desarrollará en **cuatro scripts**, cada uno con un enfoque diferente para la lectura y escritura de archivos:

### 1. `ms.js` → Modo sincrónico

```js
const fs = require('fs');

try {
    const contenido = fs.readFileSync('package.json', 'utf8');
    const contenidoObj = JSON.parse(contenido);
    const info = {
        contenidoStr: contenido,
        contenidoObj,
        size: fs.statSync('package.json').size
    };
    console.log(info);
    fs.writeFileSync('info.txt', JSON.stringify(info, null, '\t'));
} catch (error) {
    console.error('Error:', error.message);
}
```

---

### 2. `mac.js` → Modo asincrónico con callbacks

```js
const fs = require('fs');

fs.readFile('package.json', 'utf8', (err, contenido) => {
    if (err) return console.error('Error:', err.message);
    
    fs.stat('package.json', (err, stats) => {
        if (err) return console.error('Error:', err.message);
        
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: stats.size
        };
        console.log(info);
        
        fs.writeFile('info.txt', JSON.stringify(info, null, '\t'), (err) => {
            if (err) console.error('Error:', err.message);
        });
    });
});
```

---

### 3. `maptc.js` → Modo asincrónico con Promises (`then/catch`)

```js
const fs = require('fs').promises;

fs.readFile('package.json', 'utf8')
    .then(contenido => {
        return fs.stat('package.json').then(stats => ({ contenido, stats }));
    })
    .then(({ contenido, stats }) => {
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: stats.size
        };
        console.log(info);
        return fs.writeFile('info.txt', JSON.stringify(info, null, '\t'));
    })
    .catch(error => console.error('Error:', error.message));
```

---

### 4. `mapaa.js` → Modo asincrónico con `async/await`

```js
const fs = require('fs').promises;

async function procesarArchivo() {
    try {
        const contenido = await fs.readFile('package.json', 'utf8');
        const stats = await fs.stat('package.json');
        
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: stats.size
        };
        
        console.log(info);
        await fs.writeFile('info.txt', JSON.stringify(info, null, '\t'));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

procesarArchivo();
```

---

## Explicaciones y Consideraciones

- **`JSON.parse()`**: Convierte un string en un objeto JavaScript.
- **`JSON.stringify(obj, null, '\t')`**: Convierte un objeto en string con formato legible.
- **Manejo de errores**:
  - Se capturan errores de lectura/escritura de archivos.
  - Se imprimen mensajes de error en consola.
- **Diferencias entre métodos**:
  - `fs.readFileSync()` es bloqueante.
  - `fs.readFile()` usa callbacks.
  - `fs.promises.readFile()` usa `then/catch`.
  - `async/await` simplifica la sintaxis con Promises.

---

## Configuración de `npm test`

Para probar estos scripts automáticamente, edita `package.json` y agrega:

```json
"scripts": {
    "test:sync": "node ms.js",
    "test:callback": "node mac.js",
    "test:promise": "node maptc.js",
    "test:async": "node mapaa.js"
}
```

Luego, ejecuta:

```bash
npm run test:sync      # Para la versión sincrónica
npm run test:callback  # Para la versión con callbacks
npm run test:promise   # Para la versión con Promises (then/catch)
npm run test:async     # Para la versión con async/await
```

Esto ejecutará los scripts correspondientes y verificará su funcionamiento.



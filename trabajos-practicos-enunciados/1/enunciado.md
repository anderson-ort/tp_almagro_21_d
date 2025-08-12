# Manejo de Archivos en JavaScript

## Práctica

Crear un proyecto que implemente las siguientes funciones:

### 1. leerArchivoComoString

**Descripción:**
Recibe la ruta del archivo que se quiere leer y devuelve un único string con todo el contenido del mismo.

**Implementación en JavaScript:**

```js
const fs = require('fs');

function leerArchivoComoString(ruta) {
    try {
        return fs.readFileSync(ruta, 'utf8');
    } catch (error) {
        console.error(`Error al leer el archivo: ${error.message}`);
        return null;
    }
}
```

---

### 2. escribirTextoEnArchivo

**Descripción:**
Recibe una ruta, un texto y un flag, y graba ese texto en un archivo en la ruta dada. Si el directorio es válido pero el archivo no existe, decide qué hacer según el flag:

- Con el flag en `true`, crea el archivo y lo escribe.
- Con el flag en `false`, lanza el error "El archivo no existe".

**Implementación en JavaScript:**

```js
function escribirTextoEnArchivo(ruta, texto, flag) {
    const existe = fs.existsSync(ruta);
    
    if (!existe && !flag) {
        throw new Error("El archivo no existe");
    }
    
    fs.writeFileSync(ruta, texto, 'utf8');
}
```

---

### 3. transformarStringEnArrayDeNumeros

**Descripción:**
Recibe un texto y una secuencia de caracteres que usará como separador. Devuelve un array con todos los números producto de partir el texto cada vez que aparezca la secuencia separadora. Si alguna de las partes no es numérica, no se incluirá en el resultado.

**Ejemplo:**

```js
const texto = '123 | 456 | 789 | 1bc | 10';
const separador = ' | ';

function transformarStringEnArrayDeNumeros(texto, separador) {
    return texto.split(separador)
                .map(num => parseInt(num))
                .filter(num => !isNaN(num));
}

console.log(transformarStringEnArrayDeNumeros(texto, separador)); // [123, 456, 789, 10]
```

---

### 4. transformarArrayDeNumerosAUnSoloString

**Descripción:**
Recibe un array con números y una secuencia de caracteres para usar como separador. Devuelve un único string que es la unión de todos los números del array, intercalando la secuencia separadora entre cada uno.

**Ejemplo:**

```js
const array = [123, 456, 789, 10];
const separador = ',';

function transformarArrayDeNumerosAUnSoloString(array, separador) {
    return array.join(separador);
}

console.log(transformarArrayDeNumerosAUnSoloString(array, separador)); // '123,456,789,10'
```

---

### 5. combinarDosArrays

**Descripción:**
Recibe dos arrays de números ordenados en forma ascendente y sin repetidos dentro de cada uno. Devuelve un nuevo array con todos los elementos de ambos, también ordenado en forma ascendente y sin repetidos.

**Ejemplo:**

```js
const array1 = [1, 5, 10];
const array2 = [2, 3, 8, 11];

function combinarDosArrays(array1, array2) {
    return [...new Set([...array1, ...array2])].sort((a, b) => a - b);
}

console.log(combinarDosArrays(array1, array2)); // [1, 2, 3, 5, 8, 10, 11]
```

---

### 6. combinarNArrays

**Descripción:**
Similar a `combinarDosArrays`, pero recibe un array de arrays de números ordenados en forma ascendente y sin repetidos. Devuelve un nuevo array con la combinación de todos los números, también ordenado en forma ascendente y sin repetidos.

**Ejemplo:**

```js
const arrays = [[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]];

function combinarNArrays(arrays) {
    return [...new Set(arrays.flat())].sort((a, b) => a - b);
}

console.log(combinarNArrays(arrays)); // [1, 2, 3, 4, 6, 7, 10, 13, 15, 16]
```

---

## Pruebas

Para probar estas funciones, crea un archivo `test.js` y agrégale las siguientes líneas:

```js
const fs = require('fs');
const assert = require('assert');

// Importar las funciones aquí si están en otro archivo
// const { leerArchivoComoString, escribirTextoEnArchivo, transformarStringEnArrayDeNumeros, transformarArrayDeNumerosAUnSoloString, combinarDosArrays, combinarNArrays } = require('./archivoFunciones');

// Prueba para transformarStringEnArrayDeNumeros
assert.deepStrictEqual(transformarStringEnArrayDeNumeros('123 | 456 | 789 | 1bc | 10', ' | '), [123, 456, 789, 10]);

// Prueba para transformarArrayDeNumerosAUnSoloString
assert.strictEqual(transformarArrayDeNumerosAUnSoloString([123, 456, 789, 10], ','), '123,456,789,10');

// Prueba para combinarDosArrays
assert.deepStrictEqual(combinarDosArrays([1, 5, 10], [2, 3, 8, 11]), [1, 2, 3, 5, 8, 10, 11]);

// Prueba para combinarNArrays
assert.deepStrictEqual(combinarNArrays([[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]]), [1, 2, 3, 4, 6, 7, 10, 13, 15, 16]);

console.log("Todas las pruebas pasaron exitosamente.");
```

---

## Configuración de `npm test`

Para ejecutar las pruebas automáticamente, edita tu `package.json` y agrega:

```json
"scripts": {
    "test": "node test.js"
}
```

Luego, ejecuta:

```bash
npm test
```

Esto ejecutará las pruebas definidas en `test.js` y confirmará que las funciones funcionan correctamente.

📝 **Consigna: Implementación de un Logger en Node.js**  

**Objetivo:** Crear una clase `Logger` en Node.js que utilice `class`, el módulo `fs` y closures para manejar diferentes niveles de logging.  

**Requisitos:**  
1. **Uso de `class`**: La implementación debe estar basada en clases de JavaScript.  
2. **Manejo de archivos con `fs`**: Los logs deben guardarse en un archivo de texto.  
3. **Uso de closures**: Implementar un mecanismo interno que gestione los niveles de logging de forma eficiente.  
4. **Niveles de logging:** La clase debe permitir registrar logs con los siguientes niveles:  
   - `info` → Mensajes informativos  
   - `warn` → Advertencias  
   - `error` → Errores críticos  
5. **Formato del log:** Cada línea debe incluir la fecha, el nivel del log y el mensaje. Ejemplo:  
   ```
   [2025-03-26 10:15:30] [INFO] Servidor iniciado correctamente.
   [2025-03-26 10:16:05] [WARN] Uso elevado de memoria detectado.
   [2025-03-26 10:17:12] [ERROR] No se pudo conectar a la base de datos.
   ```
6. **Método estático opcional:** Un método que permita configurar la ruta del archivo donde se guardarán los logs.  

**Ejemplo de uso esperado:**  
```js
const logger = new Logger('app.log');

logger.info('Servidor iniciado correctamente.');
logger.warn('Uso elevado de memoria detectado.');
logger.error('No se pudo conectar a la base de datos.');
```

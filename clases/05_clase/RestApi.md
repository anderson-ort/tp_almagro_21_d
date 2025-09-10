## ¿Qué es una REST API?

Una **REST API** (Representational State Transfer Application Programming Interface) es una interfaz que permite la comunicación entre diferentes sistemas a través de protocolos web, utilizando principios arquitectónicos específicos.

---

## ¿Para qué se necesita?

**Para proporcionar un acceso estandarizado y universal al backend desde múltiples clientes:**

- Aplicaciones móviles (iOS, Android)
- Aplicaciones web (React, Angular, Vue)
- Otros servidores o servicios
- Dispositivos IoT
- Asistentes virtuales

---

## Estructura de una Petición REST

```
GET /restaurant/empanada
```

### 1. HTTP Method (Verbo)
- GET - Obtener datos
- POST - Crear nuevos datos  
- PUT - Actualizar datos existentes
- DELETE - Eliminar datos

### 2. Endpoint/Resource
- /restaurant - Recurso principal con el que trabajamos

### 3. Identifier/Parameter
- /empanada - Identificador específico del recurso

### Ejemplos adicionales:
```
GET    /users          → Obtener todos los usuarios
POST   /users          → Crear un nuevo usuario  
GET    /users/123      → Obtener usuario con ID 123
PUT    /users/123      → Actualizar usuario 123
DELETE /users/123      → Eliminar usuario 123
```

---

## Principio STATELESS

**Cada petición es independiente y autónoma:** 
- El servidor no guarda estado entre peticiones
- Cada request debe contener toda la información necesaria
- Se usan headers para autenticación y metadata:
  - Authorization: Bearer token123
  - Content-Type: application/json

### Ventajas del stateless:
- Escalabilidad: Se pueden agregar más servidores fácilmente
- Confiabilidad: Si un servidor falla, otro puede tomar la petición
- Simplicidad: No hay sesiones que mantener

---

## Características Clave de REST

1. Interfaz uniforme - Estructura consistente para todas las APIs
2. Stateless - Sin estado entre peticiones
3. Cacheable - Las respuestas pueden ser almacenadas en caché
4. Client-Server - Separación clara de responsabilidades
5. Sistema en capas - Puede haber intermediarios (proxies, gateways)

---

## Ejemplo Real en Código

```javascript
// Cliente haciendo una petición
fetch('https://api.miempresa.com/restaurant/empanada', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer tu-token-de-acceso',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

```json
// Respuesta típica
{
  "id": "empanada",
  "name": "Empanada de Carne",
  "price": 2.50,
  "available": true
}
```

---

## ¿Por qué usar REST?

- Estandarizado: Todo el mundo entiende HTTP
- Flexible: Funciona con cualquier lenguaje o plataforma  
- Escalable: Ideal para microservicios
- Simple: Fácil de entender e implementar

# Clase: Persistencias en Backend con Node.js y Express

## Índice de Contenidos

**FUNDAMENTOS DE PERSISTENCIA**
- ¿Qué es la Persistencia de Datos?
- Tipos de Almacenamiento
- Arquitectura en Capas
- Patrones de Diseño Aplicados

**ARQUITECTURA EN CAPAS**
- Capa de Ruteo
- Capa de Negocio (Servicios)
- Capa de Persistencia
- Ventajas de la Separación

**PATRONES DE DISEÑO**
- Singleton - Conexiones Únicas
- Factory - Creación Flexible
- DAO/DTO - Abstracción de Datos
- Repository - Gestión Unificada

**BASES DE DATOS RELACIONALES - MySQL**

[Hosted On Cloud Dev](https://aiven.io/free-mysql-database)
- Conceptos Fundamentales de SQL
- MySQL en la Nube
- Ventajas y Casos de Uso
- Implementación Práctica

**BASES DE DATOS NO RELACIONALES - MongoDB**

[Hosted On Cloud Dev](https://www.mongodb.com/products/platform?msockid=123b36342e34601d09f2204b2fed61f7)

- Paradigma Documental
- MongoDB Atlas (Cloud)
- Ventajas y Casos de Uso
- Implementación Práctica

**BAAS - Supabase**

[Hosted On Cloud Dev](https://supabase.com/)
- ¿Qué es Backend as a Service?
- Supabase como Alternativa
- Comparación con Bases Tradicionales
- Implementación Práctica

---


### **1. FUNDAMENTOS DE PERSISTENCIA**

#### **1.1. ¿Qué es la Persistencia de Datos?**
```
Definición: Capacidad de almacenar información de manera permanente
- Datos sobreviven al reinicio de la aplicación
- Recuperación posterior de información
- Histórico y trazabilidad
```

#### **1.2. Tipos de Almacenamiento**
```
✅ Archivos locales (JSON, CSV, TXT)
✅ Bases de Datos Relacionales (MySQL, PostgreSQL)
✅ Bases de Datos No Relacionales (MongoDB, Redis)
✅ Servicios en la Nube (Supabase, Firebase)
```

#### **1.3. Arquitectura en Capas - VISUAL**
```
┌─────────────────────────────────────────┐
│           CAPA DE RUTEO                 │ ← Express Routes
├─────────────────────────────────────────┤
│           CAPA DE NEGOCIO               │ ← Lógica de aplicación
├─────────────────────────────────────────┤
│           CAPA DE PERSISTENCIA          │ ← Bases de datos
└─────────────────────────────────────────┘
```

#### **1.4. Patrones Clave**
- **Singleton**: Una sola conexión a BD
- **Factory**: Crear diferentes tipos de persistencia
- **DAO**: Acceso abstracto a datos
- **DTO**: Formato consistente de datos

---

### **2. ARQUITECTURA EN CAPAS - TEORÍA PRÁCTICA**

#### **2.1. Capa de Ruteo (Routes)**
```javascript
// Propósito: Manejar peticiones HTTP
// Responsabilidades:
// - Recepción de requests
// - Validación básica
// - Envío de responses
// - NO contiene lógica de negocio
```

#### **2.2. Capa de Negocio (Services)**
```javascript
// Propósito: Implementar reglas de negocio
// Responsabilidades:
// - Validaciones complejas
// - Transformación de datos
// - Orquestación de operaciones
// - NO accede directamente a BD
```

#### **2.3. Capa de Persistencia (DAO/Repository)**
```javascript
// Propósito: Gestionar almacenamiento
// Responsabilidades:
// - Operaciones CRUD
// - Conexiones a bases de datos
// - Optimización de queries
// - Independencia del almacenamiento
```

---

### **3. PATRONES DE DISEÑO APLICADOS**

#### **3.1. Singleton - Conexión Única**
```javascript
// PROBLEMA: Múltiples conexiones consumen recursos
// SOLUCIÓN: Una única instancia compartida

class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        this.connection = null;
        DatabaseConnection.instance = this;
    }
}
```

#### **3.2. Factory - Flexibilidad**
```javascript
// PROBLEMA: Diferentes bases de datos, misma interfaz
// SOLUCIÓN: Fábrica que decide qué implementación usar

class DatabaseFactory {
    static create(type) {
        switch(type) {
            case 'mysql': return new MySQLDAO();
            case 'mongodb': return new MongoDBDAO();
            case 'supabase': return new SupabaseDAO();
        }
    }
}
```

#### **3.3. DAO/DTO - Abstracción**
```javascript
// DAO (Data Access Object): Acceso uniforme a datos
// DTO (Data Transfer Object): Formato consistente

class StudentDTO {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }
}

class StudentDAO {
    async create(student) { /* Implementación específica */ }
    async findById(id) { /* Implementación específica */ }
}
```

---

### **4. MySQL EN LA NUBE - CONCEPTOS**

#### **4.1. Características Principales**
```
✅ Estructura Tabular (Filas y Columnas)
✅ Esquema Fijo y Predefinido
✅ SQL (Structured Query Language)
✅ ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad)
✅ Relaciones (JOINs entre tablas)
```

#### **4.2. Ventajas de MySQL Cloud**
```
🟢 Escalabilidad automática
🟢 Backup y recuperación automáticos
🟢 Alta disponibilidad
🟢 Seguridad gestionada
🟢 Monitoreo integrado
```

#### **4.3. Casos de Uso Ideales**
```
💡 Aplicaciones transaccionales (e-commerce, bancos)
💡 Datos estructurados con relaciones complejas
💡 Cuando la consistencia es crítica
💡 Reportes y análisis complejos
```

#### **4.4. Estructura Típica**
```sql
-- Tablas relacionadas
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
```

---

### **5. MONGODB ATLAS - CONCEPTOS**

#### **5.1. Paradigma Documental**
```
✅ Documentos JSON-like (BSON)
✅ Esquema Flexible y Dinámico
✅ NoSQL (Not Only SQL)
✅ Escalabilidad Horizontal
✅ Alta performance en lecturas
```

#### **5.2. Ventajas de MongoDB Atlas**
```
🟢 Despliegue totalmente gestionado
🟢 Escalado automático
🟢 Búsqueda textual integrada
🟢 Agregaciones poderosas
🟢 Perfecto para datos semiestructurados
```

#### **5.3. Casos de Uso Ideales**
```
💡 Contenido generado por usuarios
💡 Catálogos de productos variables
💡 Datos de sensores/IoT
💡 Aplicaciones de contenido
💡 Prototipado rápido
```

#### **5.4. Estructura de Documentos**
```javascript
// Colección: students
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ana García",
  "email": "ana@email.com",
  "courses": ["Node.js", "Express", "MongoDB"],
  "profile": {
    "age": 25,
    "country": "Colombia"
  }
}
```

---

### **6. SUPABASE - BACKEND AS A SERVICE**

#### **6.1. ¿Qué es BaaS?**
```
Definición: Plataforma que proporciona funcionalidades
de backend listas para usar

Características:
✅ Base de datos PostgreSQL
✅ Autenticación integrada
✅ API REST automática
✅ Almacenamiento de archivos
✅ Tiempo real (WebSockets)
```

#### **6.2. Supabase vs Bases Tradicionales**
```
🆚 MySQL/MongoDB:
- Menos configuración inicial
- Funcionalidades pre-construidas
- Ideal para startups y MVP
- Menos control sobre infraestructura

🆚 Desarrollo tradicional:
- + Rapidez de desarrollo
- - Flexibilidad limitada
```

#### **6.3. Casos de Uso Ideales**
```
🚀 Prototipos y MVP rápidos
🚀 Aplicaciones pequeñas-medianas
🚀 Equipos con menos experiencia en DevOps
🚀 Cuando el tiempo de mercado es crítico
```

---

### **7. COMPARATIVA PRÁCTICA**

#### **7.1. Tabla Comparativa**
| Aspecto | MySQL | MongoDB | Supabase |
|---------|-------|---------|----------|
| **Tipo** | SQL | NoSQL | BaaS (PostgreSQL) |
| **Esquema** | Fijo | Flexible | Fijo con extensiones |
| **Escalabilidad** | Vertical | Horizontal | Automática |
| **Complejidad** | Media | Media | Baja |
| **Control** | Alto | Alto | Medio |
| **Velocidad Desarrollo** | Media | Media | Alta |

#### **7.2. Criterios de Elección**
```javascript
// ¿CUÁNDO ELEGIR CADA UNO?

const decisionMatrix = {
    mysql: [
        "Datos altamente estructurados",
        "Relaciones complejas entre entidades",
        "Transacciones críticas",
        "Reportes analíticos complejos"
    ],
    
    mongodb: [
        "Datos semiestructurados o variables",
        "Escalabilidad horizontal prioritaria",
        "Desarrollo ágil y rápido",
        "Alto volumen de lecturas"
    ],
    
    supabase: [
        "Time-to-market crítico",
        "Equipos pequeños sin DevOps",
        "Necesidad de autenticación/archivos",
        "Aplicaciones de tamaño pequeño-mediano"
    ]
};
```

---

### **FLUJO DE APRENDIZAJE RECOMENDADO**

#### **Paso 1: Fundamentos**
1. Entender arquitectura en capas
2. Comprender patrones Singleton y Factory
3. Practicar con archivos JSON locales

#### **Paso 2: MySQL Básico**
1. Conceptos de tablas y relaciones
2. Operaciones CRUD con SQL
3. Implementar DAO para MySQL

#### **Paso 3: MongoDB Básico**
1. Documentos y colecciones
2. Consultas con Mongoose
3. Implementar DAO para MongoDB

#### **Paso 4: Supabase**
1. Configuración de proyecto
2. Autenticación automática
3. API REST generada

#### **Paso 5: Patrones Avanzados**
1. Repository pattern
2. DTO para transformación
3. Factory para múltiples bases

---

### **RECURSOS ADICIONALES**

#### **Documentación Oficial**
- 📚 MySQL: https://dev.mysql.com/doc/
- 📚 MongoDB: https://docs.mongodb.com/
- 📚 Supabase: https://supabase.com/docs

#### **Herramientas de Práctica**
- 🛠️ MySQL: PlanetScale, AWS RDS
- 🛠️ MongoDB: MongoDB Atlas
- 🛠️ Supabase: Cuenta gratuita

#### **Buenas Prácticas**
- ✅ Siempre usar variables de entorno
- ✅ Implementar conexiones pool
- ✅ Manejar errores gracefulmente
- ✅ Logging para debugging
- ✅ Múltiples ambientes (dev, test, prod)

---
_(EXTRA INFO)_

# ORMS

- **Sequelize**: ORM para bases de datos SQL como PostgreSQL, MySQL, SQLite, etc.
- **Mongoose**: ODM para bases de datos NoSQL como MongoDB

# Design Patterns Aplicados al Proyecto

- **MVC** (Model-View-Controller)
- **DTO/DAO** (Data Transfer Object/Data Access Object)
- **SINGLETON**
- **FACTORY**

## Estructura General del Patrón MVC en Backend API REST

```
src/
├── config/           → configuración general (db, env)
├── controllers/      → lógica de control (maneja requests/responses)
├── daos/            → acceso a la base de datos
├── dtos/            → transformación de datos para salida
├── models/          → definición de modelos de datos
├── routes/          → define rutas y las conecta a los controladores
├── services/        → lógica de negocio
├── app.js           → inicialización de Express
└── server.js        → punto de arranque
```

## Roles de Cada Parte en MVC

| Capa            | Responsabilidad                           | Ejemplo           |
|-----------------|-------------------------------------------|-------------------|
| **Modelo**      | Define estructura de datos y relaciones   | User.js, Book.js  |
| **Vista**       | Respuesta JSON generada por controlador   | res.json(data)    |
| **Controlador** | Recibe request, invoca servicio, responde | userController.js |
| **Servicio**    | Contiene lógica de negocio                | userService.js    |
| **DAO**         | Abstracción de acceso a base de datos     | userDAO.js        |
| **DTO**         | Estructura de salida                      | userDTO.js        |

## Implementación

- **Modelos**: Definición de estructuras y relaciones
- **DAOs (Singleton)**: Acceso a la base de datos
- **Servicios**: Lógica de negocio desacoplada
- **Controladores**: Manejan requests HTTP
- **Rutas**: Conectan rutas HTTP con controladores
- **DTOs**: Garantizan salidas consistentes
- **Conexión (Singleton)**: Evita múltiples instancias de conexión DB

# ORMs Específicos

## Sequelize
ORM para bases de datos SQL que permite:
- Definir modelos (tablas) con clases o funciones
- Establecer relaciones (asociaciones)
- Usar métodos JavaScript para consultas (findAll, create, update, destroy)
- Evitar SQL manual

```bash
npm install sequelize mysql2
```

## Mongoose
Librería de modelado de datos para MongoDB que permite:
- Definir esquemas para documentos
- Manejar relaciones, validaciones, hooks
- Estructurar datos flexibles de MongoDB

```bash
npm install mongoose
```

## Comparación MongoDB con/sin Mongoose

| Sin Mongoose (MongoDB puro) | Con Mongoose         |
|-----------------------------|----------------------|
| No hay esquema definido     | Schema definido      |
| Validación manual           | Validación automática|
| Relaciones manuales         | populate() para joins|
| Código más desordenado      | Más estructura       |

# Design Patterns Detallados

## 1. DTO/DAO

**DAO (Data Access Object)**
- Capa que abstrae la lógica de acceso a base de datos
- Centraliza operaciones CRUD
- Separa lógica de acceso a datos del resto del código
- Facilita cambiar de base de datos

**DTO (Data Transfer Object)**
- Define cómo enviar o recibir datos
- Filtra o transforma información
- Evita exponer estructura interna de modelos
- Permite modificar formato sin cambiar BD


Excelente pregunta 👏 — y muy común cuando se empieza a trabajar con ORM (como Sequelize, Prisma, TypeORM, etc.).

La **respuesta corta** es:

> ❌ No **hace falta** usar DAO/DTO si estás usando una ORM, pero ✅ **sí puede tener sentido** hacerlo dependiendo de la arquitectura y el tamaño del proyecto.

Vamos por partes 👇

---

## 🧩 1. Qué hace cada cosa

| Capa                           | Rol principal                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **ORM**                        | Mapea objetos del código a tablas de la base de datos (Object-Relational Mapping). Simplifica CRUDs y consultas.                            |
| **DAO (Data Access Object)**   | Encapsula el acceso a datos (por ejemplo, queries SQL o llamadas ORM). Define métodos como `getUsers()`, `createUser()`, etc.               |
| **DTO (Data Transfer Object)** | Define estructuras de datos para transportar información entre capas (por ejemplo, entre backend y frontend, o entre controller y service). |

---

## 💡 2. Si usás una ORM…

### ✅ Lo que ya hace la ORM por vos:

* Mapea tablas ↔ clases/entidades.
* Expone métodos como `User.findAll()`, `User.create()`, etc.
* Maneja relaciones, validaciones, tipos, e incluso transacciones.

Entonces, **la capa DAO pierde mucho sentido**, porque el ORM **ya actúa como un DAO genérico**.
En lugar de tener tu propia clase `UserDAO`, usás directamente el modelo del ORM.

Ejemplo con Sequelize:

```js
// Sin DAO
const users = await User.findAll({ where: { active: true } });
```

---

## ⚙️ 3. Cuándo **sí** conviene mantener DAO/DTO

### 🏗️ DAO útil cuando:

* Tenés **reglas específicas de acceso a datos** (caching, joins complejos, filtros dinámicos, etc.).
* Querés **desacoplar el ORM** del resto del código (por si más adelante cambiás de ORM o pasás a SQL puro).
* Querés **centralizar consultas** complejas o reutilizables.

Ejemplo:

```js
// user.dao.js
class UserDAO {
  async findActiveUsers() {
    return await User.findAll({ where: { active: true } });
  }
}
```

---

###  DTO útil cuando:

* Querés **controlar qué datos exponés** al frontend (por ejemplo, no mandar `passwordHash`).
* Convertís entidades del ORM a objetos con otro formato (por ejemplo, `user.fullName` en vez de `user.firstName + user.lastName`).
* Usás un **patrón de validación/serialización**, como con `class-transformer` o `zod`.

Ejemplo:

```js
// user.dto.js
export function userToDTO(user) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  };
}
```

---

##  4. En resumen

| Situación                                                             | ¿DAO?                 | ¿DTO?                      |
| --------------------------------------------------------------------- | --------------------- | -------------------------- |
| Proyecto chico / CRUD básico                                          | ❌ No necesario        | ⚙️ Opcional                |
| Proyecto mediano/grande (servicios, reglas de negocio)                | ✅ Sí, para aislar ORM | ✅ Sí, para controlar datos |
| API pública o con capas separadas (controller / service / repository) | ✅ Recomendado         | ✅ Recomendado              |

---

##  Conclusión

👉 Si estás haciendo una app o API sencilla, **la ORM sola alcanza**.
👉 Si buscás escalabilidad, mantenibilidad o trabajar con varias capas, **DAO/DTO sigue siendo una buena práctica** sobre la ORM.


## 2. SINGLETON

- Asegura que una clase tenga una única instancia
- Uso típico: conexión a base de datos, configuración global
- Mejora rendimiento y evita fugas de recursos

## 3. FACTORY

- Delega creación de objetos a una clase/fábrica
- Permite cambiar implementación sin modificar código cliente
- Uso típico: creación de DAOs o servicios según contexto

## Resumen Práctico de Patrones

| Patrón    | Uso Típico                            | Ejemplo en Backend                     |
|-----------|---------------------------------------|----------------------------------------|
| DTO/DAO   | Separar acceso a datos y estructura   | UserDAO (CRUD), UserDTO (datos filtrados) |
| SINGLETON | Compartir instancia única            | Conexión a MongoDB/Sequelize          |
| FACTORY   | Crear objetos según contexto         | Factory que devuelve DAO según config |

# Proyecto Backend: Alquiler de Libros

## Stack Tecnológico

- **Node.js + Express** (API REST)
- **Bases de datos**:
  - **MySQL**: Para datos estructurados y transaccionales (usuarios, libros, alquileres)
  - **MongoDB**: Para datos flexibles (logs, metadata, historial)
- **Sequelize**: ORM para MySQL
- **Mongoose**: ODM para MongoDB
- **Docker + Docker Compose**: Para contenerizar bases de datos

## Motivación para Usar Ambas Bases de Datos

- **MySQL**: Ideal para entidades principales con relaciones claras, garantiza integridad y transacciones
- **MongoDB**: Útil para datos con esquema flexible, logs, historial de cambios, metadata variable

## Arquitectura y Conexión

- **Sequelize** para MySQL: maneja entidades principales con modelos y relaciones
- **Mongoose** para MongoDB: maneja colecciones no estructuradas o esquemas flexibles
- El backend combina consultas a ambas bases según necesidad

## Estructura del Proyecto

```
book-rental/
├── docker-compose.yml
├── init.sql
├── src/
│   ├── models/
│   │    ├── mysql/
│   │    │    ├── user.js
│   │    │    └── book.js
│   │    ├── mongo/
│   │    │    └── log.js
│   ├── routes/
│   │    ├── users.js
│   │    └── books.js
│   ├── controllers/
│   │    ├── userController.js
│   │    └── bookController.js
│   ├── db/
│   │    ├── mysql.js
│   │    └── mongo.js
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```
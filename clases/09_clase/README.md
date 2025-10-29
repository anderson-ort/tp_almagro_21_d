*Siguiendo con el mismo concepto de products ahora es llevarlo a Productos*

Para poder ejemplicar que esta estructura de propuesta puede llegar a hacer una api que se vuelva completamente escalable

## ESTRUCTURA FINAL DE CAPAS

```sh
src/
├── config/                       # Configuración general
│   └── config.js                 # Variables de entorno y configuraciones globales
├── databases/                    # Conexiones a bases de datos
│   ├── DatabaseSingleton.js      # Patrón Singleton para conexión global única
│   ├── mongo.cnx.js              # Configuración específica MongoDB
│   ├── mysql.cnx.js              # Configuración específica MySQL
│   └── supabase.cnx.js           # Configuración futura Supabase (opcional)
├── model/                        # Modelos ORM/ODM (estructura física)
│   ├── product.mongoose.model.js # Modelo Mongoose para MongoDB
│   └── product.model.js          # Modelo general para SQL
├── dto/                          # Data Transfer Objects
│   └── productDTO.js             # Abstracción entre capa dominio y controller
├── repository/                   # DAO (Data Access Objects)
│   ├── interfaces/               # Interfaces base
│   │   └── IProductRepository.js # Define métodos comunes del repositorio
│   ├── implementations/          # Implementaciones específicas
│   │   ├── productRepositoryMongo.js  # Implementación MongoDB
│   │   └── productRepositorySQL.js    # Implementación SQL
│   └── productRepositoryFactory.js    # Factory que selecciona DAO correcto
├── services/                     # Capa de negocio/dominio
│   └── product.service.js        # Lógica de negocio principal
├── controller/                   # Capa de controladores
│   └── product.controller.js     # Maneja requests y responses HTTP
├── router/                       # Endpoints/Rutas API
│   └── product.router.js         # Definición de rutas REST
├── validators/                   # Validadores de entrada
│   └── validators.model.js       # Schemas y validación de datos
├── utils/                        # Funciones auxiliares
│   └── updateModel.util.js       # Utilidades para actualizar modelos
├── tests/                        # Tests unitarios/integrales
├── app.js                        # Configuración app (middlewares, rutas)
└── server.js                     # Punto de entrada principal
```

## Descripción de Capas

###  **Capa de Datos**
- **`databases/`**: Conexiones y configuración BD
- **`model/`**: Modelos de datos físicos
- **`repository/`**: Patrón Repository para acceso a datos

###  **Capa de Transferencia**
- **`dto/`**: Objetos de transferencia de datos
- **`validators/`**: Validación de entrada

### **Capa de Negocio**
- **`services/`**: Lógica de negocio y reglas de dominio

### **Capa de Presentación**
- **`controller/`**: Manejo de HTTP
- **`router/`**: Definición de endpoints

### **Utilidades**
- **`config/`**: Configuración global
- **`utils/`**: Funciones auxiliares



---

## ⚙️ CAPAS Y RESPONSABILIDADES

| Capa                     | Responsabilidad                                                           | Ejemplo                                           |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------- |
| **Controller**           | Recibe y responde a las peticiones HTTP, maneja errores, transforma DTOs. | `product.controller.js`                              |
| **Service (Dominio)**    | Contiene la lógica de negocio y orquesta el uso del DAO.                  | `product.service.js`                                 |
| **Repository (DAO)**     | Abstrae la lógica de acceso a datos (Mongo, SQL, etc).                    | `productRepositoryMongo.js` / `productRepositorySQL.js` |
| **Factory**              | Devuelve el repositorio adecuado según la variable de entorno.            | `productRepositoryFactory.js`                        |
| **DTO**                  | Transforma datos entre el dominio y el exterior (controllers o APIs).     | `productDTO.js`                                      |
| **Database (Singleton)** | Gestiona las conexiones, garantizando una sola instancia global.          | `DatabaseSingleton.js`                            |
| **Model**                | Define la estructura física de los datos (ORM / ODM).                     | `product.mongoose.model.js`                          |
| **Validator**            | Valida los datos antes de llegar al dominio.                              | `validators.model.js`                             |
| **Utils**                | Funciones auxiliares reutilizables.                                       | `updateModel.util.js`                             |

---

##  FLUJO DE UNA PETICIÓN

```sh
Request (HTTP)
   ↓
Router (product.router.js)
   ↓
Controller (product.controller.js)
   ↓
Service (product.service.js)
   ↓
Repository Factory (elige DAO)
   ↓
DAO (productRepositoryMongo o SQL)
   ↓
DatabaseSingleton (gestiona conexión)
   ↓
Database (MongoDB / MySQL / Supabase)
   ↓
DTO (normaliza salida)
   ↓
Response (HTTP)
```


---
Documentacion Swagger y/o Scalar 
- [Scalar](https://scalar.com/) 
- [Swagger](https://medium.com/@HargitaiSoma/how-you-should-have-started-to-add-swagger-to-your-express-api-672a6b0a6680)

Deploy on GCP
- [GCP Deploy](https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service)


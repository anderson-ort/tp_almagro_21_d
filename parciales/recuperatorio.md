# Recuperatorio: Servidor Backend para Gestión de Tarjetas de Crédito

## Consigna 
Debes implementar un servidor backend en Node.js que gestione tarjetas de crédito asociadas a usuarios (identificados por email). **En lugar de usar una base de datos, utilizarás archivos JSON para el almacenamiento**. El proyecto debe cumplir con los siguientes requisitos:

1. **Autenticación**: 
   - Implementar autenticación básica con usuario y contraseña
   - Credenciales válidas:
     - Usuario: `admin`
     - Contraseña: `admin1234`
   - Todas las rutas CRUD deben requerir autenticación

2. **Almacenamiento JSON**:
   - Usar archivos JSON para persistir los datos
   - Un archivo para las tarjetas (ej: `cards.json`)
   - Manejar lectura/escritura de archivos de forma asíncrona

3. **Modelo principal**: 
   - Entidad `CreditCard` con los campos:
     - cardNumber (string, único)
     - cardHolder (string)
     - expirationDate (string)
     - cvv (string)
     - email (string, identificador del usuario)

4. **Operaciones CRUD**:
   - Crear tarjeta
   - Obtener tarjetas por email de usuario
   - Actualizar tarjeta
   - Eliminar tarjeta

5. **Pruebas**:
   - Crear archivos de prueba con HTTP Rest Client (extensión de VS Code)
   - Probar todas las rutas CRUD con diferentes escenarios

### Para pruebas con HTTP Rest Client:
Crear archivos `.http` con las diferentes peticiones

## Estructura de Carpetas Sugerida

```
/proyecto
│
├── /src
│   ├── /controllers
│   │   └── cards.controller.js     # Lógica de las rutas de tarjetas
│   │
│   ├── /middleware
│   │   └── auth.js                 # Middleware de autenticación
│   │
│   ├── /storage
│   │   └── jsonStorage.js          # Manejo de archivos JSON
│   │
│   ├── /tests
│   │   └── api-tests.http          # Pruebas con HTTP Rest Client
│   │
│   ├── app.js                      # Configuración principal de Express
│   └── server.js                   # Inicio del servidor
│
├── /data
│   ├── cards.json                  # Archivo JSON para tarjetas
│   └── users.json                  # Archivo JSON para usuarios (opcional)
│
├── .env                            # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## Criterios de Evaluación

| Criterio | Peso | Descripción | Puntos |
|----------|------|-------------|--------|
| **Funcionalidad** | 40% | CRUD completo + autenticación + persistencia JSON | 40 |
| **Código** | 30% | Estructura + errores + variables entorno + JSON | 30 |
| **Pruebas** | 20% | Tests HTTP Rest Client completos | 20 |
| **Documentación** | 10% | README + comentarios + instrucciones | 10 |


## Forma de entrega
Se deberá realizar un repositorio en Github | Gitlab | BitBucket con perfil público

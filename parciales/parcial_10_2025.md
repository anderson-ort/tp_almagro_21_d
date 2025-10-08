# Desarrollo de API Node.js - Parcial 2025-10-08

## Descripción General
Desarrollar una API en Node.js que implemente distintos tipos de consumo y manejo de datos. El proyecto debe cumplir con estándares de organización, buenas prácticas y uso adecuado de dependencias.

## Objetivo
Crear una API funcional con tres endpoints que demuestren capacidad para trabajar con archivos locales, APIs externas y operaciones CRUD.

## Requerimientos Técnicos

### Endpoints Obligatorios:
1. **GET /api/productos** - Devuelve datos desde archivo JSON local
2. **GET /api/usuarios-externos** - Consume API externa y almacena en CSV
3. **CRUD Completo** - Implementar operaciones CRUD para una entidad (usuarios/tareas)

### Dependencias Requeridas:
**Producción:**
- express

**Desarrollo:**
- nodemon
- morgan
- eslint o biome

## Estructura del Proyecto
```
proyecto/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   └── utils/
├── data/
│   ├── productos.json
│   └── usuarios.csv
├── tests/
└── docs/
```

## Configuración Técnica

### Criterios de Evaluación:
- **50%** - Correcto funcionamiento de endpoints
- **20%** - Arquitectura limpia y separación de responsabilidades
- **10%** - Control de versiones (GitHub)
- **10%** - Formateo de código (ESLint/Biome)
- **10%** - Pruebas implementadas

### Opcional (Puntos Extra):
- Autenticación básica
- Documentación completa de API

## Tiempo de Desarrollo
**Duración estimada:** 2 horas 30 minutos

## Criterios de Aceptación

### Mínimos Requeridos:
- [ ] Los tres endpoints funcionan correctamente
- [ ] Estructura de proyecto organizada
- [ ] Código formateado con herramienta configurada
- [ ] Repositorio en GitHub con commits descriptivos
- [ ] Manejo básico de errores

### Deseables:
- [ ] Pruebas con RestClient o Postman
- [ ] Logging con morgan implementado
- [ ] Variables de entorno configuradas
- [ ] README con instrucciones de instalación

## Entregables
1. Código fuente en repositorio GitHub
2. Documentación de endpoints
3. Archivos de prueba (HTTP/RestClient)

## Instrucciones de Ejecución
El proyecto debe incluir:
- package.json con scripts de desarrollo y producción
- .gitignore apropiado
- Configuración de formateador de código


# Git y GitHub para Desarrolladores Backend Node.js


## ¿Por qué Git es Esencial para un Desarrollador Backend?

Imaginen que están desarrollando una API REST con Node.js y Express, con múltiples endpoints, middlewares y conexiones a bases de datos. Sin Git, cualquier cambio que rompa la funcionalidad podría ser catastrófico para el sistema en producción.

**Git es crítico en el desarrollo backend porque:**
- Los servidores requieren estabilidad y trazabilidad de cambios
- Permite despliegues seguros y rollbacks rápidos
- Facilita el trabajo en equipo en arquitecturas complejas
- Es esencial para CI/CD y DevOps
- Permite mantener múltiples ambientes (dev, staging, prod)

---

## Configuración Inicial para Proyectos Backend

### Instalación de Git

**Windows:**
```bash
# Descargar desde: https://git-scm.com/
# O usar chocolatey:
choco install git
```

**macOS:**
```bash
# Con Homebrew:
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### Configuración Global para Backend
```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email (usar email corporativo)
git config --global user.email "tu.email@empresa.com"

# Configurar editor por defecto
git config --global core.editor "code --wait"

# Configurar line endings (importante para servidores Linux)
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows

# Ver configuración actual
git config --list
```

---

## Conceptos Fundamentales

### ¿Qué es un Repositorio Backend?
Un repositorio backend típicamente contiene:
- Código fuente de APIs y servicios
- Archivos de configuración (package.json, .env.example)
- Documentación de API (README, API docs)
- Scripts de deployment y CI/CD
- Archivos de Docker y orchestración
- Tests unitarios e integración

### Estados de los Archivos en Git

```
Working Directory → Staging Area → Repository → Remote
     (modified)        (staged)      (committed)   (deployed)
```

Para backend es crucial entender que el estado "Remote" puede estar conectado directamente con sistemas de deployment automático.

---

## Comandos Básicos con Proyecto Node.js

### 1. Iniciando un Proyecto Backend con Git

```bash
# Crear directorio del proyecto
mkdir mi-api-nodejs
cd mi-api-nodejs

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias básicas
npm install express cors helmet dotenv
npm install -D nodemon jest supertest

# Inicializar repositorio Git
git init

# Ver estado actual
git status
```

### 2. Estructura Típica de Proyecto Backend

```
mi-api-nodejs/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/
├── tests/
├── config/
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── server.js
```

### 3. Tu Primer Commit Backend

```bash
# Crear .gitignore específico para Node.js
echo "node_modules/
.env
.env.local
.env.production
logs/
*.log
.DS_Store
coverage/
dist/
build/" > .gitignore

# Agregar archivos al staging area
git add .

# Hacer commit inicial
git commit -m "initial: Setup Node.js API project with Express"

# Ver historial
git log --oneline
```

### 4. Trabajando con Cambios en Backend

```bash
# Ver diferencias antes de commit
git diff

# Agregar cambios específicos (buena práctica en backend)
git add src/controllers/userController.js
git add src/routes/userRoutes.js

# Commit con mensaje específico
git commit -m "feat(auth): Add user authentication controller and routes"

# Para cambios en configuración
git add config/database.js
git commit -m "config(db): Add MongoDB connection configuration"
```

---

## Branching para Desarrollo Backend

### ¿Por qué usar Branches en Backend?

En proyectos backend, usamos branches para:
- Desarrollar nuevos endpoints sin afectar APIs existentes
- Implementar cambios en base de datos de forma segura
- Separar features de diferentes microservicios
- Mantener versiones estables para producción
- Experimentar con nuevas tecnologías o librerías

### Comandos de Branching para Backend

```bash
# Ver todas las ramas
git branch

# Crear rama para nueva funcionalidad
git branch feature/payment-api

# Cambiar a la rama
git checkout feature/payment-api

# Crear y cambiar en un comando
git checkout -b feature/user-management

# Mergear cambios a main
git checkout main
git merge feature/payment-api

# Eliminar rama después del merge
git branch -d feature/payment-api
```

### Flujo de Trabajo Backend Típico

```bash
# 1. Crear rama para nueva API
git checkout -b feature/order-management-api

# 2. Desarrollar endpoints
# Crear: src/controllers/orderController.js
# Crear: src/routes/orderRoutes.js  
# Crear: src/models/orderModel.js
# Crear: tests/order.test.js

# 3. Testear funcionalidad
npm test

# 4. Commit de cambios
git add src/controllers/orderController.js src/routes/orderRoutes.js
git commit -m "feat(orders): Add order creation and retrieval endpoints"

git add src/models/orderModel.js
git commit -m "feat(models): Add Order model with validation"

git add tests/order.test.js
git commit -m "test(orders): Add unit tests for order endpoints"

# 5. Mergear a main
git checkout main
git merge feature/order-management-api
```

---

## GitHub para Proyectos Backend

### Configurando SSH para Servidores

```bash
# Generar clave SSH (usar algoritmo más seguro)
ssh-keygen -t ed25519 -C "tu.email@empresa.com" -f ~/.ssh/id_ed25519_backend

# Agregar clave al ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_backend

# Copiar clave pública
cat ~/.ssh/id_ed25519_backend.pub
# Pegar en GitHub > Settings > SSH Keys
```

### Conectando Repositorio Backend con GitHub

```bash
# Agregar remote origin
git remote add origin git@github.com:empresa/mi-api-nodejs.git

# Verificar remote
git remote -v

# Subir código por primera vez
git push -u origin main

# Para pushes posteriores
git push
```

### Clonando Proyectos Backend

```bash
# Clonar proyecto backend existente
git clone git@github.com:empresa/api-proyecto.git
cd api-proyecto

# Copiar archivo de configuración
cp .env.example .env

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

---

## Colaboración en Equipos Backend

### Workflow para APIs y Microservicios

```bash
# Actualizar rama principal
git checkout main
git pull origin main

# Crear rama para nuevo servicio
git checkout -b feature/notification-service

# Desarrollar servicio
# Implementar: src/services/notificationService.js
# Crear: src/controllers/notificationController.js
# Agregar: routes y tests

# Commit por funcionalidad
git add src/services/notificationService.js
git commit -m "feat(services): Add email notification service with template support"

# Subir rama para review
git push -u origin feature/notification-service
```

### Code Review en Backend (Pull Requests)

**Checklist típico para PR backend:**
- ¿Los endpoints tienen validación de datos?
- ¿Se implementó manejo de errores?
- ¿Se agregaron tests unitarios?
- ¿La documentación está actualizada?
- ¿Se verificó la seguridad del código?
- ¿Performance y escalabilidad consideradas?

```bash
# Después de aprobación del PR
git checkout main
git pull origin main
git branch -d feature/notification-service
```

---

## Herramientas y Mejores Prácticas Backend

### .gitignore Completo para Node.js

```gitignore
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json  # Si usas yarn
yarn.lock         # Si usas npm

# Variables de entorno y configuración sensible
.env
.env.local
.env.development
.env.test
.env.production
config/secrets.js

# Logs
logs/
*.log
loglevel.json

# Base de datos
*.sqlite
*.db
database.sqlite3

# Archivos temporales
tmp/
temp/
uploads/temp/

# Build y distribución  
build/
dist/
out/

# Coverage y tests
coverage/
.nyc_output/
.coverage/

# IDEs y editores
.vscode/
.idea/
*.swp
*.swo
*~

# Sistema operativo
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
.dockerignore
```

### Mensajes de Commit para Backend

**Formato específico para backend:**
```
type(scope): description

[optional body explaining what and why]

[optional footer with breaking changes]
```

**Ejemplos para proyectos backend:**
```bash
git commit -m "feat(auth): Add JWT token refresh mechanism"
git commit -m "fix(api): Resolve CORS headers for OPTIONS requests" 
git commit -m "perf(db): Optimize user query with database indexing"
git commit -m "security(auth): Add rate limiting to login endpoint"
git commit -m "config(docker): Update Dockerfile for production deployment"
git commit -m "docs(api): Update OpenAPI specification for user endpoints"
```

**Tipos específicos para backend:**
- `feat`: Nueva funcionalidad o endpoint
- `fix`: Corrección de bugs
- `perf`: Mejoras de performance
- `security`: Cambios relacionados con seguridad
- `config`: Cambios de configuración
- `db`: Cambios en base de datos o migraciones
- `api`: Cambios en definición de API
- `test`: Agregar o actualizar tests
- `docs`: Documentación

---

## Manejo de Configuraciones Sensibles

### Variables de Entorno

```bash
# Crear archivo .env.example (ESTE SÍ se sube a Git)
echo "PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your_jwt_secret_here
API_KEY=your_api_key_here
EMAIL_PASSWORD=your_email_password" > .env.example

# El archivo .env real NUNCA se sube a Git
git add .env.example
git commit -m "config: Add environment variables template"
```

### Configuración por Ambientes

```bash
# Ramas para diferentes ambientes
git checkout -b development
git checkout -b staging  
git checkout -b production

# Tags para releases
git tag -a v1.0.0 -m "Release version 1.0.0 - User management API"
git push origin v1.0.0
```

---

## Comandos de Rescate para Backend

### Deshacer Cambios Críticos

```bash
# Deshacer cambios en archivo crítico (config, rutas)
git checkout -- src/config/database.js

# Deshacer último commit manteniendo cambios (para rehacer commit)
git reset --soft HEAD~1

# Deshacer último commit eliminando cambios (PELIGROSO)
git reset --hard HEAD~1

# Ver historial para encontrar commit específico
git log --oneline --graph
```

### Resolver Conflictos en Configuraciones

```bash
# Listar archivos en conflicto
git status

# Ejemplo: conflicto en package.json
git add package.json
git commit -m "resolve: Fix merge conflicts in package dependencies"

# Para archivos de configuración, preferir manual merge
# Revisar cuidadosamente cambios en:
# - package.json
# - .env.example  
# - config/*
```

### Stash para Cambios Temporales

```bash
# Guardar cambios antes de pull urgente
git stash push -m "WIP: user authentication middleware"

# Cambiar rama para hotfix
git checkout hotfix/security-patch

# Volver y aplicar cambios
git checkout feature/auth-middleware
git stash pop
```

---

## Ejercicio Práctico Backend

### Proyecto: API REST de Gestión de Tareas

**Paso 1: Setup del Proyecto**
```bash
mkdir task-manager-api
cd task-manager-api
npm init -y

npm install express mongoose cors helmet dotenv bcrypt jsonwebtoken
npm install -D nodemon jest supertest

git init
```

**Paso 2: Estructura y Primer Commit**
```bash
mkdir src src/controllers src/models src/routes src/middleware tests
touch src/server.js src/app.js .env.example

# Crear .gitignore
echo "node_modules/
.env
logs/
*.log
coverage/" > .gitignore

git add .
git commit -m "initial: Setup Task Manager API project structure"
```

**Paso 3: Desarrollar Funcionalidad por Ramas**
```bash
# Rama para modelo de tareas
git checkout -b feature/task-model

# Implementar src/models/taskModel.js
git add src/models/taskModel.js
git commit -m "feat(models): Add Task model with validation schema"

# Rama para controladores
git checkout main
git checkout -b feature/task-controller

# Implementar src/controllers/taskController.js
git add src/controllers/taskController.js  
git commit -m "feat(controllers): Add CRUD operations for tasks"
```

**Paso 4: Tests y Documentación**
```bash
git checkout -b feature/task-tests

# Crear tests/task.test.js
git add tests/task.test.js
git commit -m "test(tasks): Add unit tests for task CRUD operations"

# Actualizar README con documentación de API
git add README.md
git commit -m "docs(api): Add API documentation and usage examples"
```

**Paso 5: Integración y Deploy**
```bash
# Mergear todas las features
git checkout main
git merge feature/task-model
git merge feature/task-controller  
git merge feature/task-tests

# Crear release tag
git tag -a v1.0.0 -m "Release: Task Manager API v1.0.0"

# Subir a GitHub
git remote add origin git@github.com:tuusuario/task-manager-api.git
git push -u origin main
git push origin v1.0.0
```

---

## Integración con CI/CD

### GitHub Actions para Backend

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      
    - name: Run linting
      run: npm run lint
```

### Docker y Git

```bash
# Dockerfile en repositorio
git add Dockerfile docker-compose.yml
git commit -m "config(docker): Add containerization for development and production"

# .dockerignore
echo "node_modules
.git
.env" > .dockerignore

git add .dockerignore
git commit -m "config(docker): Add dockerignore file"
```

---

## Recursos Adicionales Backend

### Herramientas Recomendadas para Backend
- **GitHub CLI**: Para manejar PRs desde terminal
- **Git Flow**: Para proyectos con releases complejas
- **Husky**: Git hooks para linting pre-commit
- **Conventional Commits**: Estándar de mensajes
- **Semantic Release**: Versionado automático

### Comandos de Consulta Backend
```bash
git status                    # Estado actual
git log --oneline --graph     # Historial visual
git branch -a                 # Todas las ramas (local y remote)
git remote -v                 # Repositorios remotos
git diff HEAD~1               # Comparar con commit anterior
git show [commit-hash]        # Ver detalles de commit específico
git blame src/app.js          # Ver quién modificó cada línea
```

### Flujo DevOps Completo

```bash
# 1. Feature development
git checkout -b feature/user-roles-api
# ... desarrollo ...
git commit -m "feat(auth): Add role-based access control"

# 2. Integration testing  
git checkout develop
git merge feature/user-roles-api
git push origin develop

# 3. Release preparation
git checkout main
git merge develop
git tag -a v1.2.0 -m "Release: Add user roles functionality"

# 4. Production deployment
git push origin main
git push origin v1.2.0

# 5. Hotfix si es necesario
git checkout -b hotfix/security-patch main
# ... fix crítico ...
git checkout main
git merge hotfix/security-patch
git tag -a v1.2.1 -m "Hotfix: Security vulnerability patch"
```

---

## Conclusiones

Git y GitHub son herramientas **indispensables** para el desarrollo backend profesional. En el contexto de APIs, microservicios y sistemas distribuidos, dominar estas herramientas te permite:


# Consignas para Trabajo Práctico Final 

## Descripción

Este trabajo práctico busca que los estudiantes puedan aplicarse como desarrolladores de software. A diferencia de los anteriores, donde la consigna estaba completamente definida, este proyecto invita a desarrollar un **proyecto propio**, incluyendo la propuesta, el diseño y la implementación del mismo. Durante todo el proceso, se contará con el acompañamiento docente.

---

## **Objetivos**

* Integrar en un único trabajo todos los conocimientos adquiridos a lo largo de las materias de programación cursadas y en curso.
* Adquirir un mayor entendimiento de las metodologías de trabajo aplicadas en la elaboración de software, incluyendo:

  * Análisis del proyecto.
  * Definición del alcance del proyecto.
  * Planificación del proyecto.
  * Presentación oral de informes de avance.
  * Entrega semanal de un ejecutable con un incremento visible y comprobable de sus funcionalidades, libre de errores.

---

## **Requisitos mínimos del proyecto**

* **Arquitectura Cliente/Servidor:** dentro de la materia, solo se evaluará el lado del servidor.
* **Servidor desarrollado en Node.js**, utilizando las técnicas vistas durante el curso y las funcionalidades de ES6+ (let/const, promesas, async/await, entre otras).
* **Capa de persistencia:** utilización de una base de datos de libre elección y correcta modularización del código.
* **Persistencia de variables de configuración:** mediante archivos o variables de entorno.
* **Implementación de al menos dos casos de uso de moderada o alta complejidad:**

  * Las operaciones CRUD básicas **no** serán consideradas de alta complejidad.
  * Se consideran de complejidad moderada o alta aquellas funcionalidades que transforman la información del sistema para generar nueva información (por ejemplo, módulos estadísticos, importadores/exportadores de datos, generación de reportes, cálculos de indicadores, etc.).
* **Cobertura de pruebas:**

  * Pruebas unitarias para los casos felices.
  * Al menos una prueba para casos no felices.
* **Documentación del sistema:**

  * Descripción de la funcionalidad desarrollada.
  * Detalle de los puntos de acceso al servidor (endpoints) y su comportamiento esperado.

---

## **Documentación de endpoints**

El proyecto deberá incluir documentación formal de su API utilizando alguna de las siguientes herramientas:

* **Swagger (OpenAPI 3.0)** mediante el uso de una interfaz visual (por ejemplo, Swagger UI) que permita la exploración de los endpoints, parámetros, tipos de respuesta y códigos de estado HTTP.
* **Scalar** como alternativa moderna que permite definir y visualizar especificaciones OpenAPI de manera interactiva.

La documentación deberá incluir:

* Descripción de cada endpoint, su propósito y el método HTTP utilizado.
* Ejemplos de request y response.
* Modelos de datos esperados.
* Posibles respuestas de error y sus códigos asociados.
* Requerimientos de autenticación cuando corresponda.

Se valorará que la documentación esté disponible a través de un endpoint del servidor (por ejemplo `/api/docs`), y que se mantenga actualizada con respecto a los cambios del sistema.

---

## **Capa de seguridad**

El sistema deberá implementar una capa de seguridad que contemple:

1. **Autenticación de usuarios:**
   Mediante credenciales (usuario y contraseña) almacenadas de forma segura. Las contraseñas deberán ser cifradas antes de su persistencia.

2. **Autorización con JWT (JSON Web Tokens):**
   Una vez autenticado el usuario, se deberá generar un token de acceso (de corta duración) que habilite el consumo de los endpoints protegidos.
   Se recomienda incluir también un token de renovación (refresh token) para extender sesiones de forma controlada.

3. **Roles y permisos:**
   En caso de que el proyecto lo requiera, deberán contemplarse diferentes roles de usuario (por ejemplo: administrador, operador, cliente), con accesos diferenciados a los recursos del sistema.

4. **Buenas prácticas de seguridad:**

   * Manejo adecuado de variables sensibles mediante variables de entorno.
   * Implementación de cabeceras de seguridad (por ejemplo, con Helmet).
   * Control de solicitudes mediante limitación de tasa (rate limiting).
   * Validación estricta de datos de entrada y respuesta de errores controlados.
   * Mecanismos de bloqueo o alerta frente a intentos reiterados de acceso no autorizado.

La autenticación y autorización serán parte fundamental del proyecto y deberán estar correctamente documentadas dentro de los endpoints.

---

## **Despliegue del proyecto**

El proyecto debera realizarse en algunas plataformas tales como:

### Opciones de despliegue

1. **Google Cloud Run:**
   Se recomienda esta opción por su integración directa con contenedores Docker y su escalabilidad automática.

   * El pipeline deberá compilar la imagen del contenedor, subirla a un registro (Container Registry o Artifact Registry) y desplegarla en un servicio de Cloud Run.
   * El proyecto deberá definir las variables de entorno necesarias para la ejecución en producción.

2. **Render:**
   Como alternativa, se podrá utilizar Render para automatizar el despliegue del servidor.

   * El pipeline podrá utilizar la API de Render para generar nuevas versiones del servicio tras cada push en la rama principal.
   * También deberá asegurarse el manejo de variables de entorno y secretos desde el panel de Render o GitHub Secrets.

El objetivo de este punto es que el proyecto cuente con un flujo de entrega continuo y verificable, asegurando que las actualizaciones lleguen a producción de manera controlada.

---

## **Modalidad de trabajo**

* El trabajo será **grupal**, con un máximo de cuatro integrantes por grupo.
* La temática será definida íntegramente por los estudiantes.
* Se realizará una sesión de **brainstorming** con docentes y alumnos para delimitar el alcance del proyecto.
* **Presentaciones semanales:**

  * Demostración funcional.
  * Estado de avance.
  * Actualización de documentación.
  * Entrega de una versión funcional libre de errores visibles.
* No se aceptarán entregas por correo electrónico, se debera realizar por medio del moodle de la **ORT**
* El orden de presentaciones será acordado previamente con los docentes.

---

## **Estructura sugerida del proyecto**

```
📁 tp2-proyecto-final
│── 📂 src
│   ├── 📂 controllers     # Controladores de la lógica de negocio
│   ├── 📂 routes          # Definición de rutas del servidor
│   ├── 📂 models          # Modelos de datos y esquemas de la base de datos
│   ├── 📂 services        # Servicios que interactúan con la capa de datos
│   ├── 📂 repositories    # Capa de acceso a datos y consultas
│   ├── 📂 config          # Archivos de configuración (variables de entorno, conexión)
│   ├── 📂 middlewares     # Middlewares de seguridad y validaciones
│   ├── 📂 tests           # Pruebas unitarias y de integración
│   ├── server.js          # Punto de entrada del servidor
│── 📂 docs                # Documentación del proyecto y especificación OpenAPI
│── 📂 public              # Archivos estáticos o frontend si aplica
│── .env                   # Variables de entorno
│── package.json           # Dependencias y scripts
│── README.md              # Instrucciones de instalación, uso y despliegue
```

---

## **Entrega final**

* Repositorio disponible en **GitHub**, **GitLab** o **Bitbucket**.
* Contar con:

  * Documentación actualizada de endpoints.
  * Capa de autenticación y autorización funcional.
  * Módulos de mediana o alta complejidad implementados.
  * Pruebas unitarias y al menos una de error.
  * Pipeline de CI/CD funcional y documentado.
  * Despliegue accesible para revisión por parte del equipo docente.

# Design Patterns que veremos en esta comision:
- _[WebSite Recomendada para lectura sobre DesignPatterns](https://refactoring.guru/design-patterns)_

**1. Singleton: Instancia Única**

* **Creational Pattern**
* **Teoría:**
    * El patrón Singleton asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a esa instancia.
    * Es útil para gestionar recursos compartidos, como configuraciones, conexiones a bases de datos o registros de eventos.
    * Su objetivo es controlar la instanciación de una clase y garantizar que solo exista un objeto de esa clase.
* **Código JavaScript:**

```javascript
    class Configuracion {
      static instancia = null;

      constructor() {
        if (Configuracion.instancia) {
          return Configuracion.instancia;
        }
        this.cargarConfiguracion();
        Configuracion.instancia = this;
      }

      cargarConfiguracion() {
        // Lógica para cargar configuraciones desde un archivo o base de datos.
        this.servidorDB = "127.0.0.1";
        this.puertoDB = 5432;
      }

      obtenerServidorDB() {
        return this.servidorDB;
      }

      obtenerPuertoDB() {
        return this.puertoDB;
      }
    }

    // Uso
    const config1 = new Configuracion();
    const config2 = new Configuracion();
    console.log(config1 === config2); // Devuelve true
    console.log(config1.obtenerServidorDB());
```

**2. Factory: Creación de Objetos**

* **Teoría:**
    * El patrón Factory define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.
    * Se utiliza para desacoplar la creación de objetos y facilitar la extensión del código.
    * Permite crear objetos sin especificar la clase exacta del objeto que se creará.
* **Código JavaScript:**

```javascript
    class ProductoA {
      mostrarInformacion() {
        console.log("Producto A");
      }
    }

    class ProductoB {
      mostrarInformacion() {
        console.log("Producto B");
      }
    }

    class CreadorProducto {
      static crearProducto(tipo) {
        if (tipo === "A") {
          return new ProductoA();
        } else if (tipo === "B") {
          return new ProductoB();
        }
        return null;
      }
    }

    // Uso
    const producto1 = CreadorProducto.crearProducto("A");
    producto1.mostrarInformacion();
```

**3. DAO/DTO: Acceso a Datos**

* **Teoría:**
    * DAO (Data Access Object): Abstrae el acceso a la base de datos, separando la lógica de acceso a datos de la lógica de negocio.
    * DTO (Data Transfer Object): Transfiere datos entre capas de la aplicación, minimizando la cantidad de llamadas a la base de datos.
    * Ayudan a mantener el código organizado y a facilitar el mantenimiento.
* **Código JavaScript:**

```javascript
    // DTO
    class UsuarioDTO {
      constructor(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
      }
    }

    // DAO
    class UsuarioDAO {
      obtenerUsuarioPorId(id) {
        // Simulación de acceso a base de datos
        return new UsuarioDTO(id, "Usuario " + id, "usuario" + id + "@example.com");
      }

      guardarUsuario(usuario) {
        // Simulación de guardado en base de datos
        console.log("Usuario guardado:", usuario);
      }
    }

    // Uso
    const usuarioDAO = new UsuarioDAO();
    const usuario = usuarioDAO.obtenerUsuarioPorId(1);
    console.log(usuario);
    usuarioDAO.guardarUsuario(new UsuarioDTO(2, "Nuevo Usuario", "nuevo@example.com"));
```

**4. Repository: Abstracción de Persistencia**

* **Teoría:**
    * El patrón Repository abstrae la lógica de persistencia, independizando la aplicación del tipo de almacenamiento.
    * Simplifica el acceso a datos y facilita la realización de pruebas unitarias.
    * Permite cambiar la implementación de la persistencia sin afectar el resto de la aplicación.
* **Código JavaScript:**

```javascript
    class UsuarioRepository {
      constructor(dao) {
        this.dao = dao;
      }

      obtenerUsuarioPorId(id) {
        return this.dao.obtenerUsuarioPorId(id);
      }

      guardarUsuario(usuario) {
        this.dao.guardarUsuario(usuario);
      }
    }

    // Uso
    const usuarioRepository = new UsuarioRepository(new UsuarioDAO());
    const usuarioRepo = usuarioRepository.obtenerUsuarioPorId(3);
    console.log(usuarioRepo);
    usuarioRepository.guardarUsuario(new UsuarioDTO(4, "Otro Usuario", "otro@example.com"));
```

**Recomendaciones para la clase:**

* Utilizar diagramas UML para visualizar las relaciones entre las clases.
* Fomentar la discusión y el análisis de casos de uso reales.
* Animar a los estudiantes a modificar y extender los ejemplos de código.
* Proporcionar ejercicios prácticos para reforzar los conceptos aprendidos.

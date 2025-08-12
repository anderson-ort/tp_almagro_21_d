
// suponiendo que estamos trabajando con alguna base de datos del tipo relacional, con esto podemos garantizar que el conexion se realiza una sola vez
// Implementación de Singleton en JavaScript
class DatabaseConnection {
    // Propiedad estática privada para almacenar la instancia única
    static #instance;
    
    // Propiedades del objeto
    #connectionId;
    #isConnected;
    
    // Constructor privado
    constructor() {
      if (DatabaseConnection.#instance) {
        throw new Error("Error: Instanciación fallida. Use DatabaseConnection.getInstance()");
      }
      this.#connectionId = Math.floor(Math.random() * 1000);
      this.#isConnected = false;
      console.log(`Constructor: Creando nueva conexión con ID ${this.#connectionId}`);
    }
    
    // Método público estático que controla el acceso a la instancia singleton
    static getInstance() {
      if (!DatabaseConnection.#instance) {
        DatabaseConnection.#instance = new DatabaseConnection();
      }
      
      console.log(`getInstance: Retornando instancia existente con ID ${DatabaseConnection.#instance.#connectionId}`);
      return DatabaseConnection.#instance;
    }
    
    // Métodos de la clase
    connect() {
      if (!this.#isConnected) {
        this.#isConnected = true;
        console.log(`Conexión ${this.#connectionId} establecida`);
        return true;
      }
      console.log(`Conexión ${this.#connectionId} ya estaba establecida`);
      return false;
    }
    
    disconnect() {
      if (this.#isConnected) {
        this.#isConnected = false;
        console.log(`Conexión ${this.#connectionId} cerrada`);
        return true;
      }
      console.log(`Conexión ${this.#connectionId} ya estaba cerrada`);
      return false;
    }
    
    executeQuery(query) {
      if (!this.#isConnected) {
        console.log(`Error: No se puede ejecutar "${query}". Conexión no establecida`);
        return null;
      }
      console.log(`Ejecutando consulta "${query}" en conexión ${this.#connectionId}`);
      return `Resultado de: ${query}`;
    }
    
    getConnectionId() {
      return this.#connectionId;
    }
    
    isConnected() {
      return this.#isConnected;
    }
  }
  
  // Ejemplo de uso del patrón Singleton
  function clientCode() {
    console.log("--- Iniciando aplicación ---");
  
    // Intentemos crear directamente una instancia (esto fallará)
    try {
      const db1 = new DatabaseConnection();
    } catch (e) {
      console.log(e.message);
    }
    
    // Obtenemos la primera instancia
    console.log("\n1. Obtenemos primera instancia:");
    const dbConnection1 = DatabaseConnection.getInstance();
    dbConnection1.connect();
    const result1 = dbConnection1.executeQuery("SELECT * FROM users");
    
    console.log("\n2. Obtenemos segunda instancia (realmente es la misma):");
    const dbConnection2 = DatabaseConnection.getInstance();
    
    // Comprobamos que ambas variables apuntan al mismo objeto
    console.log("\n3. Verificación de instancia única:");
    console.log(`¿Son el mismo objeto? ${dbConnection1 === dbConnection2}`);
    console.log(`ID de conexión 1: ${dbConnection1.getConnectionId()}`);
    console.log(`ID de conexión 2: ${dbConnection2.getConnectionId()}`);
    
    // La segunda instancia puede ver los cambios hechos por la primera
    console.log("\n4. La instancia 2 ve el estado creado por la instancia 1:");
    console.log(`Estado de conexión desde instancia 2: ${dbConnection2.isConnected() ? 'Conectado' : 'Desconectado'}`);
    
    // Podemos seguir usando la misma conexión
    console.log("\n5. Continuando con la misma conexión:");
    const result2 = dbConnection2.executeQuery("SELECT count(*) FROM orders");
    dbConnection2.disconnect();
    
    // Intentar ejecutar una consulta después de desconectar
    console.log("\n6. Intento de consulta después de desconectar:");
    const result3 = dbConnection1.executeQuery("SELECT * FROM products");
  }
  
  // Ejecutamos el código cliente
  clientCode();
import fs from "node:fs/promises"
import path from "node:path";


class Logger {
    static logFilePath = 'app.log';

    constructor() {
        this.log = this.#createLogger();
    }

    static setLogFilePath(filePath) {
        Logger.logFilePath = filePath;
    }

    #createLogger() {
        const logLevels = {
            info: 'INFO',
            warn: 'WARN',
            error: 'ERROR',
        };


        const logToFile = (level, message) => {
            const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19); // genera el momento
            const logEntry = `[${timestamp}] [${level}] ${message}\n`;

            fs.appendFile(Logger.logFilePath, logEntry, (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo de logs:', err);
                }
            });
        };

        return {
            info: (message) => logToFile(logLevels.info, message),
            warn: (message) => logToFile(logLevels.warn, message),
            error: (message) => logToFile(logLevels.error, message),
        };
    }

    info(message) {
        this.log.info(message);
    }

    warn(message) {
        this.log.warn(message);
    }

    error(message) {
        this.log.error(message);
    }
}







// Ejemplo de uso:
const logger = new Logger();

logger.info('Servidor iniciado correctamente.');
logger.warn('Uso elevado de memoria detectado.');
logger.error('No se pudo conectar a la base de datos.');

// Cambiar la ruta del archivo de logs (opcional):
Logger.setLogFilePath('custom.log');

const customLogger = new Logger();
customLogger.info('Log guardado en custom.log');


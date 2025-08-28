import fs from "node:fs/promises";

/**
 * 
 * 
 * TODA LA LOGICA DE LOS OBJETOS A USAR
 */
class JsonManager {
    db = []

    constructor(path) {
        this.path = path
    }

    async getDataFromlocal() {
        try {

            const response = await fs.readFile(this.path, { encoding: "utf8" })
            const data = await JSON.parse(response)

            if (!data) throw Error() // guard clauses -> early returns

            return data
        }
        catch (error) {
            console.error({ error: error.message })
            return []
        }
    }

    async writeDataToLocal(bebidas) {
        const data = await this.getDataFromlocal()

        console.log(`base de datos original ${bebidas.nombre}`, data);

        this.db = data
        this.db.push(bebidas)

        try {
            const dataString = JSON.stringify(this.db, null, 2)

            await fs.writeFile(this.path, dataString, { encoding: 'utf8' })
            console.log({
                Ok: true,
                payload: bebidas,
                message: "La bebida fue agregada"
            });
        }
        catch (error) {
            console.error({
                Ok: false,
                message: error.message
            });

        }
    }
}

/**
 * 
 * TODOS LOS OBJETOS QUE QUIERO EXPONER DENTRO DEL PROYECTO
*/
export {JsonManager}

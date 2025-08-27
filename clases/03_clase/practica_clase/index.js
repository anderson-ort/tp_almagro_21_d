
// crear alguna manera que pueda almacenar & leer desde un archivo JSON .. usuarios
import { error } from "node:console"
import fs from "node:fs/promises"


class Users {
    constructor(nombre, email) {
        this.nombre = nombre
        this.email = email
    }
}


class FileManager {
    db = [] //array de Users

    constructor(path) {
        this.path = path
    }

    async getData() {
        try {
            const data = await fs.readFile(this.path, { encoding: 'utf8' })
            const response = await JSON.parse(data)

            return response
        } catch (error) {
            return null
        }

    }

    async writeUser(user) {
        this.db = await this.getData() ?? this.db // 
        this.db.push(user)

        try {

            const data = JSON.stringify(this.db, null, 2);
            await fs.writeFile(
                this.path,
                data,
                { encoding: 'utf8' }
            )

            console.log({
                status: "OK",
                payload: data
            });


        } catch (error) {
            console.error(
                {
                    status: "ERROR",
                    message: error.message

                }
            );

        }


    }
}




// const ignacio = new Users("Igancio", "nashito_fotolog@yahoo.com.ar")

const brian = new Users("Brian", "test@test.com")
const localStorage = new FileManager("databaseRedis.json")

// localStorage.writeUser(brian)

localStorage
    .getData()
    .then(res => console.log(res)
    )
    .catch(e => console.error(error)

    ).finally(() => console.log("🐥 Conx lost")
    )
    

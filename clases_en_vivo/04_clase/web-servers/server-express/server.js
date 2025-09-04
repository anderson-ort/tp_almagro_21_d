import express from 'express'
import serverHtmlFileIndex from './bussiness-pressentation/html.logic.js'
import serverJsonFile from './bussiness-pressentation/json.logic.js'
import serverError from './bussiness-pressentation/error.logic.js'

const server = express()

server.use((request, response, next) => {
    const { method, url } = request 
    console.log(`METHOD: ${method} \t URL:${url}`)
    next()
})


// implementar un metodo get
// endpoints -> la ruta donde tiene alojada cierta logica -> dev json, text archivo etc
server.get('/', serverHtmlFileIndex)

server.get('/ferreteria', serverJsonFile)

// server.post
// server.put
// server.delete
// server.patch

// implementar un middleware global de errores
server.use(serverError)

export default server
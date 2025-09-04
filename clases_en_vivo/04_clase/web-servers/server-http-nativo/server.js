import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import __dirname from '../utils/dirname.util.js'
import readFile from '../utils/readfile.util.js'


// necesito que de alguna forma este servido me devuelva un archito html

const serverError = async (response, statusCode, message) => {
    const path = path.join(__dirname, '..', 'public', 'error.html')
    const data = await readFile(path)

    const errorHtml = data
        .replaceAll('{{status}}', statusCode)
        .replaceAll('{{message}}', message)


    response.writeHead(statusCode, { 'Content-Type': 'text/html' })
    response.end(errorHtml)
}

const serverHtmlFile = async (response, filename) => {
    const path = path.join(__dirname, '..', `${filename}.html`,)
    const data = await readFile(filePath)

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(data)
}


const logicaServer = async (request, response) => {
    const { method, url } = request

    if (method !== 'GET') {
        await serverError(response, 400, `Path ${url} con el metodo ${method} no esta disponible`)
        return // early return
    }

    switch (url) {
        case '/':
            await serverHtmlFile(response, 'index')
            break
        default:
            await serverError(response, 500, `Path ${url} con el metodo ${method} no esta disponible`)
            break
    }

}

const server = http.createServer(logicaServer)
export default server


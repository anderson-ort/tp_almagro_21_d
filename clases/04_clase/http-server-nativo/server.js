import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logicaServer = async (req, res) => {
  const { method, url } = req

  if (method !== 'GET') {
    await serverError(res, 400, `Path ${method} ${url} no esta implementada`)
    return
  }

  switch (url) {
    case '/':
      await serverHtmlFile(res, 'index.html')
      break
    case '/mensaje':
      await serverHtmlFile(res, 'mensaje.html')
      break
    case '/datetime':
      await serverDynamicDatetime(res)
      break
    default:
      await serverError(res, 500, `Path ${method} ${url} no esta implementada`)
      break
  }


}


const serverError = async (res, statusCode, message) => {
  try {

    const errorPath = path.join(__dirname, 'public', 'error.html')
    const data = await fs.readFile(errorPathm, 'utf8')

    const errorHtml = data
      .replace('{{status}}', statusCode)
      .replace('{{message}}', message)

    res.writeHead(statusCode, { 'Content-Type': 'text/html' })
    res.end(errorHtml)
  }
  catch (error) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>Error ${statusCode}</title></head>
            <body>
                <h1>Error ${statusCode}</h1>
                <p>${message}</p>
            </body>
            </html>
        `);
  }

}

const serverHtmlFile = async (res, filename) => {
  try {

    const filePath = path.join(__dirname, 'public', filename)
    const data = await fs.readFile(filePath, 'utf8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  } catch (error) {
    await serverError(res, 500, 'No se puede renderizar la pagina')
  }

}


const serverDynamicDatetime = async (res) => {
  try {

    const templatePath = path.join(__dirname, 'public', 'datetime.html')
    const data = await fs.readFile(templatePath, 'utf8')

    const renderHtmlData = data.replace('{{datetimeValue}}', new Date().toLocaleString())

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(renderHtmlData)
  }
  catch (error) {
    await serverError(
      res, 500, 'Error en el proceso de la fecha'
    )
  }

}

const server = http.createServer(logicaServer)

const PORT = process.env.PORT ?? 8080

server.listen(PORT, () => console.log(`Web Server Http http://127.0.0.1:${PORT}`));
server.on('error', error => console.error(`error en el servidor ${error.message}`)
)
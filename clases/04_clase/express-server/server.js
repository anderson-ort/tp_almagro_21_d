import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 8080;

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Función helper para leer archivos con manejo de errores
const readHtmlFile = async (filename) => {
  try {
    const filePath = path.join(__dirname, 'public', filename);
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`No se pudo leer el archivo: ${filename}`);
  }
};

// Ruta principal
app.get('/', async (req, res, next) => {
  try {
    const html = await readHtmlFile('index.html');
    res.send(html);
  } catch (error) {
    next(error);
  }
});

// Ruta mensaje
app.get('/mensaje', async (req, res, next) => {
  try {
    const html = await readHtmlFile('mensaje.html');
    res.send(html);
  } catch (error) {
    next(error);
  }
});

// Ruta datetime con contenido dinámico
app.get('/datetime', async (req, res, next) => {
  try {
    let html = await readHtmlFile('datetime.html');
    html = html.replace('{{datetimeValue}}', new Date().toLocaleString());
    res.send(html);
  } catch (error) {
    next(error);
  }
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Error 404</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f8f9fa; }
        .error-container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #dc3545; }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1>Error 404</h1>
        <p>Path ${req.method} ${req.url} no está implementada</p>
      </div>
    </body>
    </html>
  `);
});

// Middleware para manejo de errores
app.use(async (err, req, res, next) => {
  console.error('Error:', err.message);
  
  try {
    const errorPath = path.join(__dirname, 'public', 'error.html');
    let html = await fs.readFile(errorPath, 'utf8');
    html = html
      .replace('{{status}}', 500)
      .replace('{{message}}', 'Error interno del servidor');
    
    res.status(500).send(html);
  } catch (error) {
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error 500</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background-color: #f8f9fa; }
          .error-container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #dc3545; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <h1>Error 500</h1>
          <p>Error interno del servidor</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Express Server running on http://127.0.0.1:${PORT}`);
});
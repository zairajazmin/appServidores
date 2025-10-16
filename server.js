const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log("Petición recibida:", req.method, req.url);
  next();
});


// Ruta principal
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  try {
    const info = fs.readFileSync(filePath, "utf8");
    console.log("Contenido de index.html:\n", info);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error al leer index.html:", error.message);
    res.status(500).send("No se pudo cargar la página principal.");
  }
});

// Función para leer archivos de texto
function leerArchivo(req, res, nombreArchivo) {
  const filePath = path.join(__dirname, nombreArchivo);

  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(` Error al leer ${nombreArchivo}:`, error.message);
      return res.status(500).send(`Error al leer el archivo ${nombreArchivo}`);
    }
    console.log(`Contenido de ${nombreArchivo}:\n`, data);
    res.type('text/plain').send(data);
  });
}

// Rutas
app.get('/sincrono', (req, res) => {
  leerArchivo(req, res, 'sincrono.txt');
});

app.get('/asincrono', (req, res) => {
  leerArchivo(req, res, 'asincrono.txt');
});

// Inicia el servidor
app.listen(3001, () => {
  console.log("Servidor funcionando en el puerto 3001");
  console.log("Ruta actual (__dirname):", __dirname);
  console.log("Archivos en carpeta:", fs.readdirSync(__dirname));
});
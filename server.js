//Es necesario desplegar/ejecutar la aplicación
const express = require("express"); //framework
const cors = require("cors"); //Intercambio de recursos entre dominios
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;

//Canales de comunicación
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/herramientas', require('./routes/herramientas'));

//Iniciar nuestro servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports = app;
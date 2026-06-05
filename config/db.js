const mysql = require('mysql2/promise'); //Acceso motor BD
require("dotenv").config(); //Acceso al archivo .env

//Pool de conexiones => número definido de conexiones disponibles
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "-05:00"
});

//Inicializar la conexión a través de una función anónima
(async () => {
  try{
    const conexion = await pool.getConnection();
    console.log(`Conexión al server y MySQL correcto`);
    conexion.release()
  }catch(error){
    console.error(`Error en la conexión con MySQL: ${error.message}`)
  }
})();

module.exports = pool;
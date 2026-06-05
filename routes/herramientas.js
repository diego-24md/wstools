//Este archivo contendrá toda la lógica para operar con los datos → BD
const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Utilizando express (framework JS) vamos a utilizar métodos de acceso
//localhost:3000/herramientas
//req = require = solicitud
//res = response = respuesta (JSON)
router.get("/", async (req, res) => {
  try {
    const query = 'SELECT * FROM herramientas';

    //Deserialización, el primer valor
    //El método query devuelve una MATRIZ
    //db.query = [[registros...], [info_query...]]
    const [rows] = await db.query(query);

    //Devolvemos los datos obtenidos como JSON
    res.json({
      success: true,
      data: rows
    });
  }
  catch (err) {
    //¿Por qué 500? Error generado del lado servidor
    res.status(500).json({
      success: false,
      message: 'Error en la comunicación al servidor',
      error: err.message
    })
  }
});

// BUSCADOR
// http://IP:3000/api/herramientas/1
router.get('/:id', async (req, res) => {
  try {
    const query = 'SELECT * FROM herramientas WHERE idherramienta = ?';

    // Deserialización, el primer valor
    // El método query devuelve una MATRIZ (arreglo que contiene a otros arreglos)
    // db.query = [[registros...], [info_query...]]
    const [rows] = await db.query(query, [req.params.id]);

    // Es necesario validar si existen datos
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No encontrado'
      });
    }

    // Devolvemos los datos obtenidos como JSON
    res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {

  } catch (err) {
    //Por qué 500? Error generado del lado servidor
    res.status(500).json({
      success: false,
      message: 'Error en la comunicación al servidor',
      error: err.message
    })
  }
})

module.exports = router;
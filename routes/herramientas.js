//Este archivo contendrá toda la lógica para operar con los datos → BD
const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Utilizando express (framework JS) vamos a utilizar métodos de acceso
//localhost:3000/herramientas
//req = require = solicitud
//res = response = respuesta (JSON)
router.get("/", async(req, res) => {
  try{
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
  catch(err){
    //¿Por qué 500? Error generado del lado servidor
    res.status(500).json({
      success: false,
      message: 'Error en la comunicación al servidor',
      error: err.message
    })
  }
});


router.post("/", async(req, res) => {
    try{

    }catch(err){
        //Por qué 500? Error generado del lado servidor
        res.status(500).json({
        success: false,
        message: 'Error en la comunicación al servidor',
        error: err.message
    })
    }
})

module.exports = router;
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

//Registrar
router.post("/", async (req, res) => {
  try {
    //Consulta esperada
    const query = 'INSERT INTO herramientas (nombre, marca, descripcion, condicion, tipo) VALUES (?,?,?,?,?)';

    //Obtener datos... deserializar objeto. Se debe respetar el orden+nombres de los ATRIBUTOS
    const { nombre, marca, descripcion, condicion, tipo } = req.body;

    //EL WS tiene que tener la capacidad de validar
    if (!nombre || nombre == "") {
      return res.status(400).json({ success: false, message: 'Se requiere el nombre' });
    }

    if (!marca || marca == "") {
      return res.status(400).json({ success: false, message: 'Se requiere la marca' });
    }

    if (!descripcion || descripcion == "") {
      return res.status(400).json({ success: false, message: 'Se requiere la descripción' });
    }

    //Datos requeridos para los comodines
    const values = [
      nombre,
      marca,
      descripcion,
      condicion,
      tipo
    ];

    //Ejecutar la consulta
    const [result] = await db.query(query, values);
    res.status(201).json({
      success: true,
      message: 'Herramienta registrada correctamente',
      id: result.insertId
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error en la comunicación al servidor',
      error: err.message
    });
  }
});


// Actualizar
router.put('/:id', async (req, res) => {
  try {

    const query = `
      UPDATE herramientas
      SET nombre = ?, marca = ?, descripcion = ?, condicion = ?, tipo = ?
      WHERE idherramienta = ?
    `;

    const { nombre, marca, descripcion, condicion, tipo } = req.body;

    if (!nombre || nombre == "") {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el nombre'
      });
    }

    if (!marca || marca == "") {
      return res.status(400).json({
        success: false,
        message: 'Se requiere la marca'
      });
    }

    if (!descripcion || descripcion == "") {
      return res.status(400).json({
        success: false,
        message: 'Se requiere la descripción'
      });
    }

    if (!condicion || condicion == "") {
      return res.status(400).json({
        success: false,
        message: 'Se requiere la condición'
      });
    }

    if (!tipo || tipo == "") {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el tipo'
      });
    }

    const values = [
      nombre,
      marca,
      descripcion,
      condicion,
      tipo,
      req.params.id
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Herramienta no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Actualizado correctamente'
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error en la comunicación al servidor',
      error: err.message
    });
  }
});

//Eliminar
router.delete('/:id', async(req, res) => {
    try{
        const query = "DELETE FROM herramientas WHERE idherramienta = ?";
        const [result] = await db.query(query, [req.params.id]);

        if (result.affectedRows === 0){
            return res.status(404).json({
                success: false,
                message: "No existe la herramienta que desea eliminar"
            });
        }

        res.json({
            success: true,
            message: "Eliminado correctamente"
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
// Importaciones
const express = require("express");

const ciudadesController = require("../controllers/CiudadesController");

// Definicion de constantes
const cargosRouter = express.Router();

// Ciudades -------------------------------------------------------
cargosRouter.route("/").get(ciudadesController.getCiudades);

module.exports = cargosRouter;
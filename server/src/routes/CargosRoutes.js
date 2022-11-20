// Importaciones
const express = require("express");

const cargosController = require("../controllers/CargosController");

// Definicion de constantes
const cargosRouter = express.Router();

// Cargos -------------------------------------------------------
cargosRouter.route("/").get(cargosController.getCargos);

module.exports = cargosRouter;

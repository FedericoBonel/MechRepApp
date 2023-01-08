// Importaciones
const express = require("express");

const tallerValidators = require("../middleware/validators/TallerValidators");
const tallerController = require("../controllers/TallerController");

// Definicion de constantes
const tallerRouter = express.Router();

// Taller -------------------------------------------------------
tallerRouter
    .route("/")
    .get(tallerController.getTaller)
    .post(tallerValidators.newTallerBodyValidator, tallerController.saveTaller);

module.exports = tallerRouter;

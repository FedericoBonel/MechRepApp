// Importaciones
const express = require("express");

const empleadosValidator = require("../middleware/validators/EmpleadosValidators");
const empleadosController = require("../controllers/EmpleadosController");

// Definicion de constantes
const empleadosRouter = express.Router();

// Empleados -------------------------------------------------------
empleadosRouter
    .route("/")
    .get(empleadosController.getEmpleados)
    .post(
        empleadosValidator.newEmpleadoBodyValidator,
        empleadosController.createEmpleado
    );

// Empleado por Id -------------------------------------------------
empleadosRouter
    .route("/:idEmpleado")
    .delete(empleadosController.deleteEmpleado);

module.exports = empleadosRouter;

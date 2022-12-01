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
    .get(empleadosController.getEmpleadoById)
    .delete(empleadosController.deleteEmpleado)
    .patch(
        empleadosValidator.updateEmpleadoBodyValidator,
        empleadosController.updateEmpleado
    );

module.exports = empleadosRouter;

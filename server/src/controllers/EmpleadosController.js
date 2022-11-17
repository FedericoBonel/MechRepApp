// Importaciones
const { StatusCodes } = require("http-status-codes");

const empleadosService = require("../services/EmpleadosService");
const { SuccessResBody } = require("../utils/responsebodies");

/** Controlador que maneja los requests que registran a un empleado nuevo */
const createEmpleado = async (req, res) => {
    const empleado = req.body;

    const savedEmpleado = await empleadosService.save(empleado);

    res.status(StatusCodes.CREATED).json(new SuccessResBody(savedEmpleado));
};

module.exports = { createEmpleado };

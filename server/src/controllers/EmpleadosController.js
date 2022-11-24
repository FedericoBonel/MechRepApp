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

/** Controlador que maneja los requests que piden una lista de todos los empleados */
const getEmpleados = async (req, res) => {
    const { page, limit, cargo } = req.query;

    let empleados;
    if (cargo) {
        empleados = await empleadosService.getByCargo(cargo, page, limit);
    } else {
        empleados = await empleadosService.getAll(page, limit);
    }

    res.status(StatusCodes.OK).json(new SuccessResBody(empleados));
};

/** Controlador que maneja los requests que solicitan la eliminacion de un empleado */
const deleteEmpleado = async (req, res) => {
    const { idEmpleado } = req.params;

    // Si se pudo eliminar sera el empleado actualizado
    // si no, undefined
    const empleado = await empleadosService.deleteById(idEmpleado);

    res.status(StatusCodes.OK).json(new SuccessResBody(empleado));
};

module.exports = { createEmpleado, getEmpleados, deleteEmpleado };

// Importaciones
const { StatusCodes } = require("http-status-codes");

const cargosService = require("../services/CargosService");
const { SuccessResBody } = require("../utils/responsebodies");

/** Controlador que maneja los requests que piden la lista de cargos de empleados */
const getCargos = async (req, res) => {
    const savedCargos = await cargosService.getAll();

    res.status(StatusCodes.OK).json(new SuccessResBody(savedCargos));
};

module.exports = { getCargos };

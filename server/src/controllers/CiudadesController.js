// Importaciones
const { StatusCodes } = require("http-status-codes");

const ciudadesService = require("../services/CiudadesService");
const { SuccessResBody } = require("../utils/responsebodies");

// Definicion de constantes
const COUNTRY_CODE = process.env.CODIGO_PAIS_VALIDO || "AR";

/** Controlador que maneja los requests que piden la lista de todas las ciudades del pais valido */
const getCiudades = async (req, res) => {
    const savedCities = await ciudadesService.getAllByCountry(COUNTRY_CODE);

    res.status(StatusCodes.OK).json(new SuccessResBody(savedCities));
};

module.exports = { getCiudades };

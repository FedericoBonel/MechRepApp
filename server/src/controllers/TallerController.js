// Importaciones
const { StatusCodes } = require("http-status-codes");

const tallerServices = require("../services/TallerServices");
const { SuccessResBody } = require("../utils/responsebodies");

/** Controlador que gestiona requests que piden la informacion del taller */
const getTaller = async (req, res) => {
    const foundTaller = await tallerServices.get();

    res.status(StatusCodes.OK).json(new SuccessResBody(foundTaller));
};

/** Controlador que gestiona requests que guardan los datos del taller por primera vez */
const saveTaller = async (req, res) => {
    const newTaller = req.body;

    const savedTaller = await tallerServices.save(newTaller);

    res.status(StatusCodes.OK).json(new SuccessResBody(savedTaller));
};

module.exports = { getTaller, saveTaller };

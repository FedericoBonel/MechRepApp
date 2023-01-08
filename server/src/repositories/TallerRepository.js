// Importaciones
const { tallerModel } = require("../models/Taller");

/**
 * Obtiene el taller para el cual se esta utilizando el sistema
 * @returns El taller registrado para el cual se esta utilizando el sistema
 */
const get = async () => {
    return await tallerModel.findOne({}).lean();
};

/**
 * Guarda el taller para el cual se usa el sistema en la base de datos
 * @param {*} taller Datos del taller para el cual se usa el sistema
 * @returns Taller guardado
 */
const save = async (taller) => {
    const savedTaller = await tallerModel.create(taller);
    return savedTaller.toObject();
};

module.exports = { get, save };

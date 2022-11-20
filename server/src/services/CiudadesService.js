// Importaciones
const ciudadRepository = require("../repositories/CiudadRepository");
const { NotFoundError } = require("../utils/errors");

const validatorMsgs = require("../utils/constants/messages/ServiceErrors");

/**
 * Obtiene una lista de todas las ciudades para el pais buscado
 * @param { String } countryCode Codigo del pais del cual se quieren obtener todas las ciudades
 * @throws { NotFoundError } Si el pais no fue encontrado
 * @returns Una lista con todas las ciudades del pais
 */
const getAllByCountry = async (countryCode) => {
    const cities = await ciudadRepository.getAllByCountryCode(countryCode);
    // Si respondio pero no tiene ciudades registradas
    if (!cities.length) {
        throw new NotFoundError(`${validatorMsgs.PAIS_NOT_FOUND}${countryCode}`);
    }
    return cities;
};

module.exports = { getAllByCountry };

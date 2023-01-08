// Importaciones
const tallerRepository = require("../repositories/TallerRepository");
const ciudadRepository = require("../repositories/CiudadRepository");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const validatorMsgs = require("../utils/constants/messages/ServiceErrors");

const COUNTRY_CODE = process.env.CODIGO_PAIS_VALIDO;

/**
 * Guarda los datos del taller en el sistema
 * @param {*} newTaller Datos del taller para el cual se usa el sistema
 * @throws {NotFoundError} Si la ciudad del taller no existe
 * @throws {BadRequestError} Si ya existe un taller registrado
 * @returns El taller guardado
 */
const save = async (newTaller) => {
    // Verifica que no haya un taller registrado
    const foundTaller = await tallerRepository.get();
    if (foundTaller) {
        throw new BadRequestError(`${validatorMsgs.TALLER_EXISTS}`);
    }

    // Verifica si la ciudad del taller existe en la base de datos
    const foundCity = await ciudadRepository.getByName(
        COUNTRY_CODE,
        newTaller.direccion.ciudad
    );
    if (!foundCity) {
        throw new NotFoundError(
            `${validatorMsgs.CIUDAD_NOT_FOUND}${newTaller.direccion.ciudad}`
        );
    }

    return await tallerRepository.save(newTaller);
};

/**
 * Devuelve los datos del taller para el cual el sistema esta siendo utilizado
 * @returns los datos del taller para el cual el sistema esta siendo utilizado
 */
const get = async () => {
    return await tallerRepository.get();
};

module.exports = { save, get };

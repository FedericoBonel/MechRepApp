// Importaciones
const axios = require("axios");

const { StatusCodes } = require("http-status-codes");
const { NotFoundError, InternalServerError } = require("../utils/errors");
const messages = require("../utils/constants/messages/RepositoryErrors");

// Definicion de constantes
const ciudadesApiURL = process.env.CIUDADES_API_BASE_URL;

const ciudadesApi = axios.create({
    baseURL: ciudadesApiURL,
});

const config = {
    headers: {
        "X-CSCAPI-KEY": process.env.CIUDADES_API_KEY,
    },
};

/**
 * Obtiene una lista de todas las ciudades para el pais buscado
 * @param { String } country Codigo del pais del cual se quieren obtener todas las ciudades
 * @throws { InternalServerError } Si ocurre un error cuando llama a la api de terceros
 * @throws { NotFoundError } Si el pais no es encontrado en la base de datos
 * @returns Una lista con todas las ciudades del pais
 */
const getAllByCountryCode = async (country) => {
    let response;
    try {
        response = await ciudadesApi.get(
            `/v1/countries/${country}/cities`,
            config
        );
    } catch (err) {
        if (err.response) {
            // Si la llave expiro
            if (err.response.status === StatusCodes.UNAUTHORIZED) {
                throw new InternalServerError(messages.CIUDAD_API_EXPIRED_KEY);
                // Si el codigo de pais no fue encontrado
            } else if (err.response.status === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(messages.PAIS_NOT_FOUND);
            }
        }
        // Si es un error no documentado en la API
        throw new InternalServerError(messages.UNKNOWN_API_ERROR);
    }
    return response.data;
};

/**
 * Obtiene una ciudad de un pais por nombre
 * @param { String } country Codigo del pais del cual se quiere obtener la ciudad
 * @param { String } name Nombre de la ciudad que se quiere obtener
 * @returns Una lista con todas las ciudades del pais
 */
const getByName = async (country, name) => {
    const countries = await getAllByCountryCode(country);
    const foundCity = binarySearchByName(countries, name);
    return foundCity;
};

/**
 * Aplica una busqueda binaria por todo un array de ciudades ordenados por nombre
 * @param { [*] } cities Array de ciudades
 * @param {String} name Nombre de la ciudad a buscar
 * @returns Undefined si no se encuentra en el array, la ciudad de caso contrario
 */
const binarySearchByName = (cities, name) => {
    let left = 0;
    let right = cities.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (cities[middle].name === name) {
            return cities[middle];
        } else if (cities[middle].name < name) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return undefined;
};

module.exports = { getAllByCountryCode, getByName };

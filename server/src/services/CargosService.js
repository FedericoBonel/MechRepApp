// Importaciones
const cargosRepository = require("../repositories/CargosRepository");

/**
 * Consigue una lista de todos los cargos del sistema
 * @param {Number} page Numero de la pagina de documentos que desean conseguirse, de ser 0 retorna todos los cargos
 * @param {Number} limit Cantidad de documentos a mostrar por pagina, de ser 0 retorna todos los cargos
 * @returns Lista de todos los cargos
 */
const getAll = async (page = 0, limit = 0) => {
    // Calcula el numero de documentos que deben saltearse
    const skip = (page - 1) * limit;

    const savedCargos = await cargosRepository.getAll(skip, limit);

    return savedCargos.map((cargo) => toCargoBody(cargo));
};

/**
 * Extrae la informacion publica del cargo que sera expuesta a la web
 * @param {*} cargoModel Cargo tal y como se persiste en la base de datos
 * @returns Cargo tal y como deberia ser expuesto a los usuarios de la API
 */
const toCargoBody = (cargoModel) => {
    // Extrae la informacion de la accion que es relevante
    const { acciones, __v, ...cargoBody } = cargoModel;

    cargoBody.acciones = acciones.map((accion) => ({
        _id: accion._id,
        verbo: accion.verbo,
    }));

    return cargoBody;
};

module.exports = { getAll };

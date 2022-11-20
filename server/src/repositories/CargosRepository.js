// Importaciones
const { cargoModel } = require("../models/Cargo");

/**
 * Busca un cargo en la base de datos por nombre
 * @param {String} nombre Nombre del cargo a buscar
 * @returns El cargo encontrado
 */
const getByNombre = async (nombre) => {
    return await cargoModel.findOne({ nombre: nombre }).exec();
};

/**
 * Consigue una lista de todos los cargos
 * @param {Number} skip Valor opcional, establece el numero de documentos que deben saltearse desde el inicio
 * @param {Number} limit  Valor opcional, esteblece la cantidad de documentos a conseguir, de ser 0 retorna todos los cargos almacenados
 * @returns Todos los cargos almacenados en la base de datos ordenados por nombre alfabeticamente
 */
const getAll = async (skip = 0, limit = 0) => {
    return await cargoModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate("acciones")
        .sort("nombre")
        .lean()
        .exec();
};

module.exports = { getByNombre, getAll };

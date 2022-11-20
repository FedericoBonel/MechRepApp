// Imports
const { empleadoModel } = require("../models/Empleado");

/**
 * Busca un empleado por email en la base de datos
 * @param {String} email Email del empleado que se quiere encontrar
 * @returns El empleado encontrado
 */
const getByEmail = async (email) => {
    return await empleadoModel.findOne({ email: email }).exec();
};

/**
 * Guarda un empleado y lo devuelve
 * @param {*} empleado Empleado a ser guardado
 * @returns Empleado guardado
 */
const save = async (empleado) => {
    return (await empleadoModel.create(empleado)).toObject();
};

module.exports = { getByEmail, save };

// Importaciones
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
 * Consigue una lista de todos los empleados
 * @param {Number} skip Valor opcional, establece el numero de documentos que deben saltearse desde el inicio
 * @param {Number} limit Valor opcional, esteblece la cantidad de documentos a conseguir, de ser 0 retorna todos los empleados
 * @returns Todos los empleados almacenados en la base de datos ordenados por nombre alfabeticamente
 */
const getAll = async (skip, limit) => {
    return await empleadoModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort("nombres apellidos")
        .populate("cargo")
        .lean();
};

/**
 * Consigue un empleado por id
 * @param {String} idEmpleado Id del empleado a buscar
 * @returns Empleado con el id pedido o undefined en caso contrario
 */
const getById = async (idEmpleado) => {
    return await empleadoModel.findById(idEmpleado).populate("cargo").lean();
};

/**
 * Consigue una lista de todos los empleados por cargo
 * @param {String} cargoId Identificador del cargo por el cual se desea filtrar la lista de empleados
 * @param {Number} skip Valor opcional, establece el numero de documentos que deben saltearse desde el inicio
 * @param {Number} limit  Valor opcional, esteblece la cantidad de documentos a conseguir, de ser 0 retorna todos los empleados con el cargo proveido
 * @returns Todos los empleados almacenados en la base de datos ordenados por nombre alfabeticamente con el cargo proveido
 */
const getByCargo = async (cargoId, skip = 0, limit = 0) => {
    return await empleadoModel
        .find({ cargo: cargoId })
        .skip(skip)
        .limit(limit)
        .sort("nombres apellidos")
        .populate("cargo")
        .lean();
};

/**
 * Guarda un empleado y lo devuelve
 * @param {*} empleado Empleado a ser guardado
 * @returns Empleado guardado
 */
const save = async (empleado) => {
    const savedEmpleado = await (
        await empleadoModel.create(empleado)
    ).populate("cargo");
    return savedEmpleado.toObject();
};

/**
 * Elimina un empleado por id y lo devuelve
 * @note Esta funcion no elimina los posibles reportes donde
 *       el empleado podria estar involucrado
 * @param {String} idEmpleado Id del empleado a ser eliminado
 * @returns Empleado eliminado
 */
const deleteById = async (idEmpleado) => {
    return await empleadoModel.findByIdAndDelete(idEmpleado).lean();
};

/**
 * Actualiza un empleado por id y lo devuelve
 * @param {String} idEmpleado Id del empleado a actualizar
 * @param {*} updates Nuevos campos y valores a ser asignados al empleado
 * @returns Empleado actualizado
 */
const updateById = async (idEmpleado, updates) => {
    return await empleadoModel
        .findByIdAndUpdate(idEmpleado, updates, {
            new: true,
        })
        .populate("cargo")
        .lean();
};

module.exports = {
    getByEmail,
    save,
    getAll,
    getById,
    getByCargo,
    deleteById,
    updateById,
};

// Importaciones
const { reporteMecanicoModel } = require("../models/ReporteMecanico");
const { resetDaysAndHours } = require("../utils/dates/DateFunctions");

/**
 * Busca todos los reportes mecanicos que tengan algun tipo de relacion con un mecanico
 * @param {String} idEmpleado Identificador del empleado para el cual se desea buscar los reportes
 * @returns Todos los reportes mecanicos encontrados
 */
const getAllByEmpleado = async (idEmpleado) => {
    return await reporteMecanicoModel
        .find({
            $or: [
                { mecanicoAsignado: idEmpleado },
                { receptor: idEmpleado },
                { "danosReparar.reparacionCompletada.mecanico": idEmpleado },
            ],
        })
        .lean();
};

/**
 * Obtiene todos los reportes cerrados en el año y mes de la fecha proveída
 * @param {Date} date fecha con el año y mes por los cuales se desea obtener los reportes
 * @note El dia de la fecha sera ignorado
 * @returns Todos los reportes cerrados en ese año y mes
 */
const getAllByClosureYearAndMonth = async (date) => {
    const startDate = resetDaysAndHours(date);

    const limitDate = new Date(startDate);
    limitDate.setUTCMonth(startDate.getUTCMonth() + 1);

    return await reporteMecanicoModel
        .find({
            fechaCierre: { $lt: limitDate, $gte: startDate },
        })
        .lean();
};

module.exports = { getAllByEmpleado, getAllByClosureYearAndMonth };

// Importaciones
const { reporteMecanicoModel } = require("../models/ReporteMecanico");

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

module.exports = { getAllByEmpleado };

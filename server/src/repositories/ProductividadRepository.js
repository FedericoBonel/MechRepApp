// Importaciones
const { productividadModel } = require("../models/Productividad");
const { resetDaysAndHours } = require("../utils/dates/DateFunctions");

/**
 * Busca todos los puntajes de productividad desde la base de datos por año y mes
 * @param {Date} date Fecha conteniendo el año y mes de los puntajes queridos
 * @note El dia de la fecha sera ignorado
 * @returns Todos los puntajes de productividad generados para esas fechas
 */
const getByYearAndMonth = async (date, skip, limit) => {
    const normalizedDate = resetDaysAndHours(date);

    return await productividadModel
        .find({
            fecha: normalizedDate,
        })
        .populate("empleado")
        .sort("-puntaje")
        .skip(skip)
        .limit(limit)
        .lean();
};

/**
 * Guarda todos los puntajes en la base de datos
 * @param {[*]} puntajes Un array con todos los puntajes a guardar
 * @returns Un array con todos los puntajes guardados
 */
const saveAll = async (puntajes) => {
    return await productividadModel
        .insertMany(puntajes, {
            populate: "empleado",
        })
        .then((docs) => docs.map((doc) => doc.toObject()));
};

module.exports = { getByYearAndMonth, saveAll };

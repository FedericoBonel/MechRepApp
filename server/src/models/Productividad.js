const mongoose = require("mongoose");

const { NOMBRE_MODELO: EMPLEADO_NOMBRE } = require("./Empleado");
const validationMsgs = require("../utils/constants/messages/ProductividadValidation");
const { resetDaysAndHours } = require("../utils/dates/DateFunctions");

const NOMBRE_MODELO = "Productividad";
const NOMBRE_COLECCION = "productividades_mensuales";

/**
 * Esquema de un puntaje de productividad en base de datos
 */
const productividadSchema = new mongoose.Schema(
    {
        empleado: {
            type: mongoose.Types.ObjectId,
            ref: EMPLEADO_NOMBRE,
        },
        fecha: {
            type: Date,
            validate: (date) => {
                const userDate = new Date(date);
                const now = new Date();
                const limitDate = resetDaysAndHours(now);

                return (
                    userDate.getTime() < limitDate.getTime() &&
                    userDate.getUTCDate() === 1
                );
            },
            required: [true, validationMsgs.FECHA_NOT_PROVIDED],
        },
        puntaje: {
            type: Number,
            required: [true, validationMsgs.PUNTAJE_NOT_PROVIDED],
        },
        nReparaciones: {
            type: Number,
            required: [true, validationMsgs.REPARACIONES_NOT_PROVIDED],
        },
        horasTotalesReparaciones: {
            type: Number,
            required: [true, validationMsgs.HORAS_NOT_PROVIDED],
        },
    },
    { timestamps: true }
);

/**
 * Modelo del puntaje de productividad para acceder a la coleccion de puntajes de productividad en base de datos
 */
const productividadModel = mongoose.model(
    NOMBRE_MODELO,
    productividadSchema,
    NOMBRE_COLECCION
);

module.exports = { productividadModel, NOMBRE_MODELO };

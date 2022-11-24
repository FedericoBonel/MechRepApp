// Importaciones
const mongoose = require("mongoose");

const validationValues = require("../utils/constants/validation/ReporteMecanicoValidation");
const validationMsgs = require("../utils/constants/messages/ReporteMecanicoValidation");
const { clienteSchema } = require("./Cliente");
const { vehiculoSchema } = require("./Vehiculo");
const { NOMBRE_MODELO: EMPLEADO_NOMBRE } = require("./Empleado");

// Definicion de constantes
const NOMBRE_MODELO = "ReporteMecanico";
const NOMBRE_COLECCION = "reportes_mecanicos";

/**
 * Esquema de una reparacion completada de un daño a reparar en base de datos
 */
const reparacionCompletadaSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            minlength:
                validationValues.REPARACION_COMPLETADA_DESCRIPCION_MIN_LENGTH,
            maxlength:
                validationValues.REPARACION_COMPLETADA_DESCRIPCION_MAX_LENGTH,
            required: [
                true,
                validationMsgs.REPARACION_COMPLETADA_DESCRIPCION_INVALID,
            ],
        },
        horaFechaInicio: {
            type: Date,
            validate: (date) => new Date(date).getTime() < new Date().getTime(),
            required: [
                true,
                validationMsgs.REPARACION_COMPLETADA_FECHA_INICIO_INVALID,
            ],
        },
        horaFechaFin: {
            type: Date,
            validate: (date) =>
                new Date(date).getTime() <= new Date().getTime(),
            required: [
                true,
                validationMsgs.REPARACION_COMPLETADA_FECHA_FIN_INVALID,
            ],
        },
        mecanico: {
            type: mongoose.Types.ObjectId,
            ref: EMPLEADO_NOMBRE,
            required: [
                true,
                validationMsgs.REPARACION_COMPLETADA_MECANICO_NOT_PROVIDED,
            ],
        },
    },
    { timestamps: true }
);

/**
 * Esquema de un daño a reparar en base de datos
 */
const danoRepararSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            minlength: validationValues.DANO_REPARAR_DESCRIPCION_MIN_LENGTH,
            maxlength: validationValues.DANO_REPARAR_DESCRIPCION_MAX_LENGTH,
            required: [
                true,
                validationMsgs.DANO_REPARAR_DESCRIPCION_INVALID_LENGTH,
            ],
        },
        reparacionCompletada: {
            type: reparacionCompletadaSchema,
        },
    },
    { timestamps: true }
);

/**
 * Esquema de un reporte mecanico en base de datos
 */
const reporteMecanicoSchema = new mongoose.Schema(
    {
        cliente: {
            type: clienteSchema,
            required: [true, validationMsgs.CLIENTE_NOT_PROVIDED],
        },
        vehiculo: {
            type: vehiculoSchema,
            required: [true, validationMsgs.VEHICULO_NOT_PROVIDED],
        },
        abierto: {
            type: Boolean,
            default: true,
        },
        receptor: {
            type: mongoose.Types.ObjectId,
            ref: EMPLEADO_NOMBRE,
            required: [true, validationMsgs.RECEPTOR_NOT_PROVIDED],
        },
        mecanicoAsignado: {
            type: mongoose.Types.ObjectId,
            ref: EMPLEADO_NOMBRE,
        },
        danosPrevios: {
            type: String,
            minlength: validationValues.DANO_PREVIO_MIN_LENGTH,
            maxlength: validationValues.DANO_PREVIO_MAX_LENGTH,
        },
        danosReparar: {
            type: [danoRepararSchema],
            validate: (danos) =>
                danos &&
                danos.length &&
                danos.length < validationValues.DANO_REPAR_ARRAY_MAX_LENGTH,
            required: [true, validationMsgs.DANOS_REPARAR_NOT_PROVIDED],
        },
        fechaCierre: {
            type: Date,
            validate: (date) =>
                new Date(date).getTime() <= new Date().getTime(),
        },
    },
    { timestamps: true }
);

/**
 * Modelo del reporte mecanico para acceder a la coleccion de reportes mecanicos en base de datos
 */
const reporteMecanicoModel = mongoose.model(
    NOMBRE_MODELO,
    reporteMecanicoSchema,
    NOMBRE_COLECCION
);

module.exports = { reporteMecanicoModel, NOMBRE_MODELO };

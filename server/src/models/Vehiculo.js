// Importaciones
const mongoose = require("mongoose");

const validationValues = require("../utils/constants/validation/VehiculoValidation");
const validationMsgs = require("../utils/constants/messages/VehiculoValidation");

/**
 * Esquema de un vehiculo en base de datos
 */
const vehiculoSchema = new mongoose.Schema(
    {
        patente: {
            type: String,
            minlength: validationValues.PATENTE_MIN_LENGTH,
            maxlength: validationValues.PATENTE_MAX_LENGTH,
            required: [true, validationMsgs.PATENTE_INVALID_LENGTH],
        },
        numeroSerie: {
            type: String,
            minlength: validationValues.NUMERO_SERIE_LENGTH,
            maxlength: validationValues.NUMERO_SERIE_LENGTH,
            required: [true, validationMsgs.NUMERO_SERIE_INVALID],
        },
        marca: {
            type: String,
            minlength: validationValues.MARCA_MIN_LENGTH,
            maxlength: validationValues.MARCA_MAX_LENGTH,
            required: [true, validationMsgs.MARCA_INVALID_LENGTH],
        },
        modelo: {
            type: String,
            minlength: validationValues.MODELO_MIN_LENGTH,
            maxlength: validationValues.MODELO_MAX_LENGTH,
            required: [true, validationMsgs.MODELO_INVALID_LENGTH],
        },
        fechaFabricacion: {
            type: Date,
            validate: (date) =>
                new Date(date).getTime() <= new Date().getTime(),
            required: [true, validationMsgs.FECHA_FABRICACION_INVALID],
        },
        numeroAsientos: {
            type: Number,
            min: validationValues.NUMERO_ASIENTOS_MIN_VALUE,
            max: validationValues.NUMERO_ASIENTOS_MAX_VALUE,
            required: [true, validationMsgs.NUMERO_ASIENTOS_INVALID],
        },
    },
    { timestamps: true, _id: false }
);

module.exports = { vehiculoSchema };

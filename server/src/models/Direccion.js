// Importaciones
const mongoose = require("mongoose");

const validationValues = require("../utils/constants/validation/PersonasValidation");
const validationMsgs = require("../utils/constants/messages/PersonasValidation");

const PAIS_VALIDO = process.env.PAIS_VALIDO || "Argentina";

/**
 * Esquema de una direccion en base de datos
 */
const direccionSchema = new mongoose.Schema(
    {
        pais: {
            type: String,
            validate: {
                validator: (direccion) => direccion === PAIS_VALIDO,
                message: validationMsgs.PAIS_NOT_VALID,
            },
            required: [true, validationMsgs.PAIS_NOT_PROVIDED],
        },
        ciudad: {
            type: String,
            minlength: validationValues.CIUDAD_MIN_LENGTH,
            maxlength: validationValues.CIUDAD_MAX_LENGTH,
            required: [true, validationMsgs.CIUDAD_NOT_VALID],
        },
        calle: {
            type: String,
            minlength: validationValues.CALLE_MIN_LENGTH,
            maxlength: validationValues.CALLE_MAX_LENGTH,
            required: [true, validationMsgs.CALLE_NOT_VALID],
        },
        numero: {
            type: Number,
            min: validationValues.NUMERO_MIN_VALUE,
            max: validationValues.NUMERO_MAX_VALUE,
            required: [true, validationMsgs.NUMERO_NOT_PROVIDED],
        },
    },
    { _id: false }
);

module.exports = { direccionSchema };

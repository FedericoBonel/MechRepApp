// Importaciones
const mongoose = require("mongoose");

const validationValues = require("../utils/constants/validation/PersonasValidation");
const validationMsgs = require("../utils/constants/messages/PersonasValidation");
const { direccionSchema } = require("./Direccion");

/**
 * Esquema de un cliente en base de datos
 */
const clienteSchema = new mongoose.Schema(
    {
        nombres: {
            type: String,
            minlength: validationValues.NOMBRES_MIN_LENGTH,
            maxlength: validationValues.NOMBRES_MAX_LENGTH,
            required: [true, validationMsgs.NOMBRES_INVALID_LENGTH],
        },
        apellidos: {
            type: String,
            minlength: validationValues.APELLIDOS_MIN_LENGTH,
            maxlength: validationValues.APELLIDOS_MAX_LENGTH,
            required: [true, validationMsgs.APELLIDOS_INVALID_LENGTH],
        },
        direccion: {
            type: direccionSchema,
            required: [true, validationMsgs.DIRECCION_NOT_PROVIDED],
        },
        email: {
            type: String,
            minlength: validationValues.EMAIL_MIN_LENGTH,
            maxlength: validationValues.EMAIL_MAX_LENGTH,
            required: [true, validationMsgs.EMAIL_INVALID_LENGTH],
        },
        telefono: {
            type: String,
            minlength: validationValues.TELEFONO_LENGTH,
            maxlength: validationValues.TELEFONO_LENGTH,
            required: [true, validationMsgs.TELEFONO_INVALID],
        },
    },
    { timestamps: true, _id: false }
);

module.exports = { clienteSchema };

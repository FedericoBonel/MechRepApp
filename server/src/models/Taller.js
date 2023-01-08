const mongoose = require("mongoose");

const { direccionSchema } = require("./Direccion");
const validationValues = require("../utils/constants/validation/TallerValidation");
const validationMsgs = require("../utils/constants/messages/TallerValidation");
const NOMBRE_MODELO = "Taller";
const NOMBRE_COLECCION = "taller";

/**
 * Esquema de un taller en base de datos
 */
const tallerSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            minlength: validationValues.TALLER_NOMBRE_MIN_LENGTH,
            maxlength: validationValues.TALLER_NOMBRE_MAX_LENGTH,
            required: [true, validationMsgs.NOMBRE_NOT_PROVIDED],
        },
        direccion: {
            type: direccionSchema,
            required: [true, validationMsgs.DIRECCION_NOT_PROVIDED],
        },
        telefono: {
            type: String,
            minlength: validationValues.TELEFONO_LENGTH,
            maxlength: validationValues.TELEFONO_LENGTH,
            required: [true, validationMsgs.TELEFONO_INVALID],
        },
        email: {
            type: String,
            minlength: validationValues.EMAIL_MIN_LENGTH,
            maxlength: validationValues.EMAIL_MAX_LENGTH,
            required: [true, validationMsgs.EMAIL_INVALID_LENGTH],
            unique: true,
        },
    },
    { timestamps: true }
);

/**
 * Modelo del taller para acceder a la coleccion del taller en base de datos
 */
const tallerModel = mongoose.model(
    NOMBRE_MODELO,
    tallerSchema,
    NOMBRE_COLECCION
);

module.exports = { tallerModel, NOMBRE_MODELO };

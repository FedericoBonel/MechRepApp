// Importaciones
const mongoose = require("mongoose");

const { direccionSchema } = require("./Direccion");
const { NOMBRE_MODELO: NOMBRE_CARGO } = require("./Cargo");
const validationValues = require("../utils/constants/validation/PersonasValidation");
const validationMsgs = require("../utils/constants/messages/PersonasValidation");

// Definicion de constantes
const NOMBRE_MODELO = "Empleado";

/**
 * Esquema de un empleado en base de datos
 */
const empleadoSchema = new mongoose.Schema(
    {
        nombres: {
            type: String,
            minlength: validationValues.NOMBRES_MIN_LENGTH,
            maxlength: validationValues.NOMBRES_MAX_LENGTH,
            required: [true, validationMsgs.NOMBRES_INVALID_LENGTH],
        },
        fechaNacimiento: {
            type: Date,
            validate: (date) => {
                const validDate = new Date();
                validDate.setFullYear(
                    validDate.getFullYear() -
                        validationValues.MIN_VALUE_YEARS_BIRTHDATE
                );
                return date.getTime() <= validDate.getTime();
            },
            required: [true, validationMsgs.FECHA_NACIMIENTO_NOT_VALID],
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
            unique: true,
        },
        telefono: {
            type: String,
            minlength: validationValues.TELEFONO_LENGTH,
            maxlength: validationValues.TELEFONO_LENGTH,
            required: [true, validationMsgs.TELEFONO_INVALID],
        },
        cargo: {
            type: mongoose.Types.ObjectId,
            ref: NOMBRE_CARGO,
            required: [true, validationMsgs.CARGO_NOT_PROVIDED],
        },
        password: {
            type: String,
            minlength: validationValues.PASSWORD_MIN_LENGTH,
            maxlength: validationValues.PASSWORD_MAX_LENGTH_ENCRYPTED,
            required: [true, validationMsgs.CLAVE_INVALID],
        },
        contratado: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    { timestamps: true }
);

/**
 * Modelo del empleado para acceder a la coleccion de empleados en base de datos
 */
const empleadoModel = mongoose.model(NOMBRE_MODELO, empleadoSchema);

module.exports = { empleadoModel, NOMBRE_MODELO };

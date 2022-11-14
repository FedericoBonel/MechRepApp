// Importaciones
const mongoose = require("mongoose");

const { NOMBRE_MODELO: NOMBRE_CARGO } = require("./Cargo");
const validationValues = require("../utils/constants/validation/EmpleadosValidation");
const validationMsgs = require("../utils/constants/messages/EmpleadosValidation");

// Definicion de constantes
const NOMBRE_MODELO = "Empleado";
const PAIS_VALIDO = process.env.PAIS_VALIDO || "Argentina";

/**
 * Esquema de la direccion en base de datos
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

/**
 * Esquema del empleado en base de datos
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

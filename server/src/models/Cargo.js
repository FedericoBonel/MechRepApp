// Importaciones
const mongoose = require("mongoose");
const { NOMBRE_MODELO: ACCION_NOMBRE } = require("./Accion");

const validationValues = require("../utils/constants/validation/PersonasValidation");
const validationMsgs = require("../utils/constants/messages/PersonasValidation");

// Definicion de constantes
const NOMBRE_MODELO = "Cargo";

/**
 * Esquema de un cargo en base de datos
 */
const cargoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            minlength: validationValues.CARGOS_MIN_LENGTH,
            maxlength: validationValues.CARGOS_MAX_LENGTH,
            required: [true, validationMsgs.CARGO_NOT_PROVIDED],
            unique: true,
        },
        acciones: [
            {
                type: mongoose.Types.ObjectId,
                ref: ACCION_NOMBRE,
            },
        ],
    },
    { timestamps: true }
);

/**
 * Modelo de un cargo para acceder a la coleccion de cargos en base de datos
 */
const cargoModel = mongoose.model(NOMBRE_MODELO, cargoSchema);

module.exports = { cargoModel, NOMBRE_MODELO };

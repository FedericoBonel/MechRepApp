// Importaciones
const mongoose = require("mongoose");

const validationValues = require("../utils/constants/validation/PersonasValidation");

// Definicion de constantes
const NOMBRE_MODELO = "Accion";
const NOMBRE_COLECCION = "acciones";

/**
 * Esquema de una accion en base de datos
 */
const accionSchema = new mongoose.Schema(
    {
        verbo: {
            type: String,
            minlength: validationValues.ACCION_MIN_LENGTH,
            maxlength: validationValues.ACCION_MAX_LENGTH,
            unique: true,
        },
    },
    { timestamps: true }
);

/**
 * Modelo de una accion para acceder a la coleccion de acciones en base de datos
 */
const accionModel = mongoose.model(
    NOMBRE_MODELO,
    accionSchema,
    NOMBRE_COLECCION
);

module.exports = { accionModel, NOMBRE_MODELO, NOMBRE_COLECCION };

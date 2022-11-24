/**
 * Contiene todos los valores para realizar las validaciones de los campos recibidos correspondientes a reportes mecanicos
 */
 const VALORES = {
    // Reparaciones Completadas
    REPARACION_COMPLETADA_DESCRIPCION_MIN_LENGTH: 4,
    REPARACION_COMPLETADA_DESCRIPCION_MAX_LENGTH: 512,

    // Danos a Reparar
    DANO_REPAR_DESCRIPCION_MIN_LENGTH: 4,
    DANO_REPAR_DESCRIPCION_MAX_LENGTH: 512,
    DANO_REPAR_ARRAY_MAX_LENGTH: 20,

    // Danos previos a no Reparar
    DANO_PREVIO_MIN_LENGTH: 4,
    DANO_PREVIO_MAX_LENGTH: 512,

};

module.exports = VALORES;

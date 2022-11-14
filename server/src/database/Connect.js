const mongoose = require('mongoose');

/**
 * Funcion que inicializa la conexion con la base de datos
 * @param {*} uri URI donde la base de datos esta ejecutandose
 * @returns Promesa de la conexion
 */
const connectToDB = async (uri) => {
    return mongoose.connect(uri);
}

module.exports = connectToDB;
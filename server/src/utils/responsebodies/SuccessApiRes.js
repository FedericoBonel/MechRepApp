// Importaciones
const ApiResBody = require("./ApiResBody");

/**
 * Abstrae al cuerpo de una respuesta exitosa
 * Asigna el valor de exito a verdadero y agrega un campo con los datos a ser devueltos
 */
class SuccessApiRes extends ApiResBody {
    /**
     * Construye un cuerpo de respuesta exitosa para la api con los datos a ser devueltos
     * @param {*} data Datos a ser devueltos en el cuerpo de la respuesta
     */
    constructor(data) {
        super(true);
        this.data = data;
        if (data instanceof Array) {
            this.numberHits = data.length;
        }
    }
}

module.exports = SuccessApiRes;

/**
 * Fichero que contiene todas las interacciones con la api
 * para gestionar ciudades
 */
import axios from "axios";

import apiConstantes from "./Constants";

const empleadosInstanceAPI = axios.create({
    baseURL: apiConstantes.EMPLEADOS_URL,
});

/**
 * Busca todos los empleados desde el back end
 * @param cargo Parametro opcional, de ser proporcionado filtra la lista por el cargo
 * @param page Parametro opcional, de ser proporcionado se traera solo una pagina especifica de todos los empleados
 * @param limit Parametro opcional, de ser proporcionado se traera solo esta cantidad especfica de empleados desde la base de datos
 * @returns La respuesta del servidor con todos los empleados
 */
const getEmpleados = async (cargo = "", page = 1, limit = 10) => {
    const config = { params: { cargo, page, limit } };

    const response = await empleadosInstanceAPI.get("/", config);
    return await response.data;
};

/**
 * Crea un empleado en el back end
 * @param {*} newEmpleado Nuevo empleado con todos sus campos
 * @returns La respuesta del servidor con el nuevo empleado
 */
const postEmpleado = async (newEmpleado) => {
    return await empleadosInstanceAPI.post("/", newEmpleado);
};

/**
 * Elimina un empleado desde el back end
 * @param {String} idEmpleado Identificador del empleado a eliminar
 * @returns Undefined si el empleado fue eliminado correctamente o
 *          el empleado actualizado como no contratado en caso de que haya participado en reportes mecanicos
 */
const deleteEmpleado = async (idEmpleado) => {
    const deletedRes = await empleadosInstanceAPI.delete(`/${idEmpleado}`);
    return deletedRes.data;
};

const empleadosAPI = {
    getEmpleados,
    postEmpleado,
    deleteEmpleado,
};

export default empleadosAPI;

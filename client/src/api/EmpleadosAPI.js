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
 * Crea un empleado en el back end
 * @param {*} newEmpleado
 * @returns La respuesta del servidor con el nuevo empleado
 */
const postEmpleado = async (newEmpleado) => {
    return await empleadosInstanceAPI.post("/", newEmpleado);
};

const empleadosAPI = {
    postEmpleado,
};

export default empleadosAPI;

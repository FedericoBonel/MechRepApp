/**
 * Fichero que contiene todas las interacciones con la api
 * para gestionar la informacion del taller
 */
import axios from "axios";

import apiConstantes from "./Constants";

const tallerInstanceAPI = axios.create({
    baseURL: apiConstantes.TALLER_URL,
});

/**
 * Busca la info del taller desde el back end
 * @returns La respuesta del servidor con todas la info del taller
 */
const getTaller = async () => {
    const response = await tallerInstanceAPI.get("/");
    return response.data;
};

/**
 * Guarda los datos del taller en el servidor
 * @param {*} taller Datos del nuevo taller
 * @returns La respuesta del servidor con los datos del nuevo taller
 */
const postTaller = async (taller) => {
    const response = await tallerInstanceAPI.post("/", taller);
    return response.data;
};

const tallerAPI = {
    getTaller,
    postTaller,
};

export default tallerAPI;

/**
 * Fichero que envuelve la logica de acceso al back end y la gestion de estados y errores
 */
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import apiConstants from "../../api/Constants";
import ciudadesAPI from "../../api/CiudadesAPI";
import { useEffect } from "react";

/**
 * Devuelve el estado completo de React Query que busca todas las ciudades en el back end
 * @returns El estado completo de react query del query de todas las ciudades del sistema
 */
export const useCiudadesData = () => {
    const navigate = useNavigate();

    const queryState = useQuery(
        apiConstants.CIUDADES_CACHE,
        ciudadesAPI.getCiudades
    );

    useEffect(() => {
        if (queryState.isError) {
            navigate(
                `${routes.PATH_ERROR}/${
                    queryState.error.response
                        ? queryState.error.response.status
                        : "500"
                }`
            );
        }
    }, [navigate, queryState]);

    return queryState;
};

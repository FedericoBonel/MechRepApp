/**
 * Fichero que envuelve la logica de acceso al back end y la gestion de estados y errores
 */
import {
    useQuery
} from "react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import apiConstants from "../../api/Constants";
import cargosAPI from "../../api/CargosAPI";
import { useEffect } from "react";

/**
 * Devuelve el estado completo de React Query que busca todos los cargos en el back end
 * @returns El estado completo de react query del query de todos los cargos del sistema
 */
export const useCargosData = () => {
    const navigate = useNavigate();
    const queryState = useQuery(apiConstants.CARGOS_CACHE, cargosAPI.getCargos);

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

/**
 * Fichero que envuelve la logica de acceso al back end y la gestion de estados y errores
 */
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import apiConstants from "../../api/Constants";
import tallerAPI from "../../api/TallerAPI";
import { useEffect } from "react";

/**
 * Devuelve el estado completo de React Query que busca la informacion del taller en el back end
 * @param {function} onSuccess Parametro opcional que provee la funcion que sera ejecutada al cargaar los datos del taller
 * @returns El estado completo de react query del query de la informacion del taller del sistema
 */
export const useTallerData = (onSuccess) => {
    const navigate = useNavigate();

    const queryState = useQuery(
        apiConstants.TALLER_CACHE,
        tallerAPI.getTaller,
        { onSuccess: onSuccess }
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

/**
 * Devuelve el estado completo de React Query que guarda la informacion del taller
 * @param {function} onSuccess La funcion a ejecutar cuando el guardado sea exitoso
 * @returns El estado completo de react query del query que registra a talleres
 */
export const useCreateTaller = (onSuccess) => {
    const navigate = useNavigate();

    const queryState = useMutation(tallerAPI.postTaller, {
        onSuccess: onSuccess,
    });

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

/**
 * Fichero que envuelve la logica de acceso al back end y la gestion de estados y errores
 */
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import apiConstants from "../../api/Constants";
import empleadosAPI from "../../api/EmpleadosAPI";
import { useEffect } from "react";

/**
 * Devuelve el estado completo de React Query que busca todos los puntajes de productivdad en el back end
 * por pagina
 * @param {Date} prodDate El mes y año por el cual se desean obtener los puntajes de productividad en el back end
 * @returns El estado completo de react query del query infinito de todos los puntajes de productividad del sistema
 */
export const useInfiniteProductividadData = (prodDate) => {
    const navigate = useNavigate();

    const queryState = useInfiniteQuery({
        queryKey: [apiConstants.PRODUCTIVIDAD, prodDate],
        queryFn: ({ pageParam = 1 }) =>
            empleadosAPI.getProductividad(prodDate.toISOString(), pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.numberHits ? allPages.length + 1 : undefined,
    });

    useEffect(() => {
        if (queryState.isError) {
            navigate(
                `${routes.PATH_ERROR}/${
                    queryState.error.response ? queryState.error.status : "500"
                }`
            );
        }
    }, [navigate, queryState]);

    return queryState;
}
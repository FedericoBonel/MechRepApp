/**
 * Fichero que envuelve la logica de acceso al back end y la gestion de estados y errores
 */
import { useQuery, useInfiniteQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import apiConstants from "../../api/Constants";
import empleadosAPI from "../../api/EmpleadosAPI";
import { useEffect } from "react";

/**
 * Devuelve el estado completo de React Query que busca todos los empleados en el back end
 * por pagina
 * @param {String} filterCargoSelected El cargo por el cual se desea obtener el listado de empleados
 * @returns El estado completo de react query del query infinito de todos los empleados del sistema
 */
export const useInfiniteEmpleadosData = (filterCargoSelected) => {
    const navigate = useNavigate();

    const queryState = useInfiniteQuery({
        queryKey: [apiConstants.EMPLEADOS_CACHE, filterCargoSelected],
        queryFn: ({ pageParam = 1 }) =>
            empleadosAPI.getEmpleados(filterCargoSelected, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            // Si la ultima pagina tuvo resultados agrega una pagina mas
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
};

/**
 * Devuelve el estado completo de React Query que elimina a un empleado por id
 * @param {function} onSuccess La funcion a ejecutar cuando la eliminacion sea exitosa
 * @returns El estado completo de react query del query que elimina empleados
 */
export const useDeleteEmpleado = (onSuccess) => {
    const navigate = useNavigate();

    const queryState = useMutation(empleadosAPI.deleteEmpleado, {
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

/**
 * Devuelve el estado completo de React Query que crea a un empleado
 * @param {function} onSuccess La funcion a ejecutar cuando la creacion sea exitosa
 * @returns El estado completo de react query del query que crea a empleados
 */
export const useCreateEmpleado = (onSuccess) => {
    const navigate = useNavigate();

    const queryState = useMutation(empleadosAPI.postEmpleado, {
        onSuccess: onSuccess,
    });

    useEffect(() => {
        if (queryState.isError) {
            if (
                queryState.error.response?.status < 400 ||
                queryState.error.response?.status >= 500
            ) {
                navigate(
                    `${routes.PATH_ERROR}/${queryState.error.response.status}`
                );
            } else if (!queryState.error.response) {
                navigate(`${routes.PATH_ERROR}/500`);
            }
        }
    }, [navigate, queryState]);

    return queryState;
};

/**
 * Devuelve el estado completo de React Query que actualiza a un empleado por id
 * @param {String} idEmpleado El identificador del empleado a ser actualizado
 * @param {function} onSuccess La funcion a ejecutar cuando la actualizacion sea exitosa
 * @returns El estado completo de react query del query que actualiza a empleados
 */
export const useUpdateEmpleado = (idEmpleado, onSuccess) => {
    const navigate = useNavigate();

    const queryState = useMutation(
        (updatedEmpleado) =>
            empleadosAPI.patchEmpleado(idEmpleado, updatedEmpleado),
        {
            onSuccess: onSuccess,
        }
    );

    useEffect(() => {
        if (queryState.isError) {
            if (
                queryState.error.response?.status < 400 ||
                queryState.error.response?.status >= 500
            ) {
                navigate(
                    `${routes.PATH_ERROR}/${queryState.error.response.status}`
                );
            } else if (!queryState.error.response) {
                navigate(`${routes.PATH_ERROR}/500`);
            }
        }
    }, [navigate, queryState]);

    return queryState;
};

/**
 * Devuelve el estado completo de React Query que busca un empleado por id en el back end
 * @param {String} idEmpleado El identificador del empleado que se desea obtener
 * @param {function} onSuccess La funcion a ejecutar cuando la obtencion del empleado sea exitosa
 * @returns El estado completo de react query de la busqueda de un empleado por id en el sistema
 */
export const useEmpleadoByIdData = (idEmpleado, onSuccess) => {
    const navigate = useNavigate();

    const queryState = useQuery(
        [apiConstants.EMPLEADOS_CACHE, idEmpleado],
        () => empleadosAPI.getEmpleadoById(idEmpleado),
        {
            onSuccess: onSuccess,
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
        }
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

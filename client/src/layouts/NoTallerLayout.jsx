import { Outlet, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { tallerData } from "../hooks/data";
import { routes } from "../routes";

/**
 * Plantilla para las rutas que NO requeriran de los datos del taller,
 * usado para verificar si el taller ya ha sido registrado o no antes de utilizar el sistema
 */
const NoTallerLayout = () => {
    const { isLoading, isSuccess, data: taller } = tallerData.useTallerData();

    const routing = isLoading ? (
        <div className="container__loading-msg">
            <FontAwesomeIcon icon={faSpinner} size="2x" spin />
        </div>
    ) : isSuccess && taller.data ? (
        <Navigate to={routes.PATH_HOME} />
    ) : (
        <Outlet />
    );

    return routing;
};

export default NoTallerLayout;

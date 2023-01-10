import { Outlet, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { tallerData } from "../hooks/data";
import { routes } from "../routes";
import { Navbar } from "../components";

/**
 * Plantilla para las rutas que requeriran de los datos del taller,
 * usado para verificar si el taller ya ha sido registrado o no antes de utilizar el sistema
 */
const NeedsTallerLayout = () => {
    const { isLoading, isSuccess, data: taller } = tallerData.useTallerData();

    const routing = isLoading ? (
        <div className="container__loading-msg">
            <FontAwesomeIcon icon={faSpinner} size="2x" spin />
        </div>
    ) : isSuccess && taller.data ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to={routes.PATH_CREATE_TALLER} />
    );

    return routing;
};

export default NeedsTallerLayout;

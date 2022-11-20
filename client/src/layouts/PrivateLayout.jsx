import { Outlet } from "react-router-dom";

import { Navbar } from "../components";

/**
 * Plantilla para las rutas que seran privadas y requeriran de autenticacion,
 * aplica los componentes que deben estar presentes en todas las paginas privadas.
 */
const PrivateLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default PrivateLayout;

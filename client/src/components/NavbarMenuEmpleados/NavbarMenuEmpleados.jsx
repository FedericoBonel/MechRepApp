import { useRef } from "react";
import { Link } from "react-router-dom";

import "./NavbarMenuEmpleados.css";
import { messages } from "../../assets/messages";
import { routes } from "../../routes";
import { useOutsideClickListener } from "../../hooks";

/**
 * Componente del menu de pop up de empleados
 */
const NavbarMenuEmpleados = ({ onClose }) => {
    // Obtene la referencia al menu
    // y agrega el listener para cerrarlo cuando se clickee afuera
    const menu = useRef(null);
    useOutsideClickListener(menu, onClose);

    return (
        <ul
            className="container__empleados-popup swing-in"
            ref={menu}
            onClick={onClose}
        >
            <Link to={routes.PATH_EMPLEADOS}>
                <li>{messages.NAVBAR_POP_UP_EMPLEADOS_LIST}</li>
            </Link>
            <Link to={routes.PATH_CREATE_EMPLEADO}>
                <li>{messages.NAVBAR_POP_UP_EMPLEADOS_CREATE}</li>
            </Link>
            <Link to={routes.PATH_PROD_EMPLEADOS}>
                <li>{messages.NAVBAR_POP_UP_EMPLEADOS_PROD}</li>
            </Link>
        </ul>
    );
};

export default NavbarMenuEmpleados;

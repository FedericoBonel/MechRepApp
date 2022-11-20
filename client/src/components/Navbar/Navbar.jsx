import { Link, useMatch } from "react-router-dom";

import "./Navbar.css";
import logo from "../../assets/images/MechRepAppLogo.png";

import { messages } from "../../assets/messages/";
import { routes } from "../../routes/";

/**
 * Componente de la Barra de navegacion superior del sistema
 */
const Navbar = () => {
    // Obten el menu seleccionado desde la URL
    const match = useMatch("/:menu/*");
    const selectedMenu = match?.params.menu;

    return (
        <nav className="container__navbar">
            {/* Logo de la aplicacion */}
            <Link to={routes.PATH_HOME}>
                <img
                    className="container__navbar-logo"
                    src={logo}
                    alt={messages.NAVBAR_LOGO_ALT}
                />
            </Link>
            {/* Links del navbar */}
            <ul className="container__navbar-links">
                <li>
                    <Link
                        to={routes.PATH_EMPLEADOS}
                        className={`container__navbar-links_${
                            selectedMenu === routes.EMPLEADOS
                                ? "selected"
                                : "unselected"
                        }`}
                    >
                        {messages.EMPLEADOS}
                    </Link>
                </li>
                <li>
                    <Link
                        to={routes.PATH_CARGOS}
                        className={`container__navbar-links_${
                            selectedMenu === routes.CARGOS
                                ? "selected"
                                : "unselected"
                        }`}
                    >
                        {messages.CARGOS}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

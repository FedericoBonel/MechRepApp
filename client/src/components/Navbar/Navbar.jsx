import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import logo from "../../assets/images/MechRepAppLogo.png";
import { NavbarMenuEmpleados } from "../";
import { messages } from "../../assets/messages/";
import { routes } from "../../routes/";

/**
 * Componente de la Barra de navegacion superior del sistema
 */
const Navbar = () => {
    // Obten el menu seleccionado desde la URL
    const match = useMatch("/:menu/*");
    const selectedMenu = match?.params.menu;

    // Estados -------------------------------------------------------
    const [showMenu, setShowMenu] = useState("");

    // Renderizaciones -----------------------------------------------
    const homeButton = (
        <Link to={routes.PATH_HOME}>
            <img
                className="container__navbar-logo"
                src={logo}
                alt={messages.NAVBAR_LOGO_ALT}
            />
        </Link>
    );

    const menuEmpleados = (
        <li>
            <button
                className={`container__navbar-links_button container__navbar-links_${
                    selectedMenu === routes.EMPLEADOS
                        ? "selected"
                        : "unselected"
                }`}
                onClick={() => setShowMenu("empleados")}
            >
                {messages.EMPLEADOS} {<FontAwesomeIcon icon={faCaretDown} />}
            </button>
            {showMenu === "empleados" && (
                <NavbarMenuEmpleados onClose={() => setShowMenu("")} />
            )}
        </li>
    );

    const menuCargos = (
        <li>
            <Link
                to={routes.PATH_CARGOS}
                className={`container__navbar-links_${
                    selectedMenu === routes.CARGOS ? "selected" : "unselected"
                }`}
            >
                {messages.CARGOS}
            </Link>
        </li>
    );
    return (
        <nav className="container__navbar">
            {/* Logo de la aplicacion */}
            {homeButton}
            {/* Links del navbar */}
            <ul className="container__navbar-links">
                {menuEmpleados}
                {menuCargos}
            </ul>
        </nav>
    );
};

export default Navbar;

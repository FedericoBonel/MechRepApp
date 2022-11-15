import { Link } from "react-router-dom";
import "./MenuEmpleados.css";

import { messages } from "../../assets/messages/";
import { routes } from "../../routes/";

/**
 * Componente del menu de gestion de empleados
 */
const MenuEmpleados = () => {
    return (
        <main className="container__menu-empleados">
            <div className="container__menu-empleados_card">
                <div className="container__menu-empleados_card-top">
                    <h1>{messages.MENU_EMPLEADOS_TITLE}</h1>
                    <Link
                        className="container__button-aceptar"
                        to={routes.PATH_CREATE_EMPLEADO}
                    >
                        {messages.REGISTRAR_EMPLEADO}
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default MenuEmpleados;

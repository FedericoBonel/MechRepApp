import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./MenuEmpleados.css";
import { SingleEmpleado, Select } from "../../components";
import { messages } from "../../assets/messages/";
import apiConstants from "../../api/Constants";
import { routes } from "../../routes/";
import { empleadosData, cargosData } from "../../hooks/data";

/**
 * Componente del menu de gestion de empleados
 */
const MenuEmpleados = () => {
    const queryClient = useQueryClient();
    // Estados ---------------------------------------------------------------
    const [filterCargoSelected, setFilterCargoSelected] = useState("");

    // Interacciones con API -------------------------------------------------
    const {
        isLoading: empleadosIsLoading,
        data: empleados,
        isSuccess: empleadoIsSuccess,
        fetchNextPage: getNextEmpleadosPage,
        hasNextPage: empleadosHasNextPage,
        isFetchingNextPage: empleadosIsLoadingMore,
    } = empleadosData.useInfiniteEmpleadosData(filterCargoSelected);

    const { mutate: deleteEmpleado, isLoading: deleteEmpleadoIsLoading } =
        empleadosData.useDeleteEmpleado((empleadoActualizado) => {
            queryClient.invalidateQueries(apiConstants.EMPLEADOS_CACHE);
            toast.dismiss();

            if (empleadoActualizado.data) {
                toast.warning(messages.MENU_EMPLEADOS_NO_PUDO_BORRAR_EMPLEADO, {
                    position: "top-center",
                });
            }
        });

    useEffect(() => {
        if (deleteEmpleadoIsLoading) {
            toast(messages.MENU_EMPLEADOS_BORRANDO_EMPLEADO, {
                position: "bottom-left",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                icon: () => <FontAwesomeIcon icon={faSpinner} spin />,
            });
        }
    }, [deleteEmpleadoIsLoading]);

    const {
        isLoading: cargoIsLoading,
        data: cargos,
        isSuccess: cargoIsSuccess,
    } = cargosData.useCargosData();

    // Handlers de eventos ---------------------------------------------------
    const onSelectFilter = (e) => setFilterCargoSelected(e.target.value);

    // Renderizaciones -------------------------------------------------------
    let renderedEmpleados;
    let renderedLoadMoreBtn;
    if (empleadoIsSuccess) {
        if (empleados.pages.length) {
            renderedEmpleados = empleados.pages.map((grupo) =>
                grupo.data.map((empleado) => (
                    <SingleEmpleado
                        key={empleado._id}
                        empleado={empleado}
                        onDelete={() => deleteEmpleado(empleado._id)}
                        isDeleting={deleteEmpleadoIsLoading}
                    />
                ))
            );
        }

        // Si no se encontro nada en la base de datos en la primera pagina
        // Mostra un mensaje acorde, si no mostra un boton de carga
        if (!empleados.pages[0].numberHits) {
            renderedLoadMoreBtn = (
                <p className="container__loading-msg">
                    {messages.MENU_EMPLEADOS_NO_EMPLEADOS}
                </p>
            );
        } else {
            if (empleadosHasNextPage) {
                renderedLoadMoreBtn = (
                    <button
                        onClick={() => getNextEmpleadosPage()}
                        className="container__button-load_more"
                    >
                        {empleadosIsLoadingMore ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            messages.MENU_EMPLEADOS_SIGUIENTE_PAG_EMPLEADOS
                        )}
                    </button>
                );
            } else {
                renderedLoadMoreBtn = (
                    <p className="container__loading-msg">
                        {messages.MENU_EMPLEADOS_NO_MAS_EMPLEADOS}
                    </p>
                );
            }
        }
    }

    let renderedCargoFilter;
    if (cargoIsSuccess) {
        let cargosOptions = cargos?.data.map((cargo) => cargo.nombre);
        // Adjunta la opcion de reseteo de seleccion
        cargosOptions.push("");
        renderedCargoFilter = (
            <>
                <h2 className="container__menu-empleados_card-menu_name">
                    {messages.MENU_EMPLEADOS_FILTROS}{" "}
                    {<FontAwesomeIcon icon={faFilter} />}
                </h2>
                <div>
                    <h3 className="container__menu-empleados_card-menu_propname">
                        {messages.MENU_EMPLEADOS_FILTRAR_CARGO}
                    </h3>
                    <Select
                        className="container__menu-empleados_card-menu_select"
                        value={filterCargoSelected}
                        setValue={onSelectFilter}
                        options={cargosOptions}
                        noSelection={messages.SELECT_CARGO_DEFAULT}
                    />
                </div>
            </>
        );
    } else if (cargoIsLoading) {
        renderedCargoFilter = (
            <div className="container__loading-msg">
                <FontAwesomeIcon icon={faSpinner} spin size={"2x"} />
            </div>
        );
    }

    return (
        <main className="container__menu-empleados">
            <div className="container__menu-empleados_card">
                {/* Encabezado */}
                <div className="container__menu-empleados_card-top">
                    <div>
                        <h1>{messages.MENU_EMPLEADOS_TITLE}</h1>
                    </div>
                    <Link
                        className="container__button-aceptar"
                        to={routes.PATH_CREATE_EMPLEADO}
                    >
                        {messages.REGISTRAR_EMPLEADO}
                    </Link>
                </div>
                {/* Contenido */}
                <div className="container__menu-empleados_card-bottom">
                    {/* Opciones de filtrado */}
                    <div className="container__menu-empleados_card-menu">
                        <div className="container__menu-empleados_card-menu_card">
                            {renderedCargoFilter}
                        </div>
                    </div>
                    {/* Lista */}
                    <div className="container__menu-empleados_card-list">
                        {empleadosIsLoading && (
                            <div className="container__loading-msg">
                                <p>{messages.MENU_EMPLEADOS_CARGANDO}</p>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size={"2x"}
                                />
                            </div>
                        )}
                        {empleadoIsSuccess && renderedEmpleados}
                        {renderedLoadMoreBtn}
                    </div>
                </div>
            </div>
            <ToastContainer className="toast__container" />
        </main>
    );
};

export default MenuEmpleados;

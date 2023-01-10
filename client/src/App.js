import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import {
    MenuEmpleados,
    FormularioEmpleados,
    MenuCargos,
    FormularioEdicionEmpleados,
    ProductividadEmpleados,
    TallerFormulario,
} from "./pages";
import { PrivateLayout, NeedsTallerLayout, NoTallerLayout } from "./layouts";
import { routes } from "./routes/";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Solo accesible a usuarios logeados */}
                <Route path="/" element={<PrivateLayout />}>
                    <Route path="/" element={<NeedsTallerLayout />}>
                        <Route path={`${routes.EMPLEADOS}`}>
                            {/* Lista de empleados */}
                            <Route index element={<MenuEmpleados />} />
                            {/* Creacion de empleados */}
                            <Route
                                path={routes.CREATE}
                                element={<FormularioEmpleados />}
                            />
                            {/* Productividad de empleados */}
                            <Route
                                path={`${routes.PATH_PROD_EMPLEADOS}`}
                                element={<ProductividadEmpleados />}
                            />
                            {/* Edicion de empleados */}
                            <Route
                                path={`${routes.UPDATE}/:idEmpleado`}
                                element={<FormularioEdicionEmpleados />}
                            />
                        </Route>
                        <Route path={`${routes.CARGOS}`}>
                            {/* Lista de cargos */}
                            <Route index element={<MenuCargos />} />
                        </Route>
                    </Route>
                    {/* Registro del taller */}
                    <Route path="/" element={<NoTallerLayout />}>
                        <Route
                            path={routes.PATH_CREATE_TALLER}
                            element={<TallerFormulario />}
                        />
                    </Route>
                </Route>
                {/* Errores */}
                <Route
                    path={routes.PATH_ERROR_CODE_PARAM}
                    element={<p>Error</p>}
                />
                <Route
                    path="*"
                    element={<Navigate to={`${routes.PATH_ERROR}/404`} />}
                />
            </Routes>
        </Router>
    );
};

export default App;

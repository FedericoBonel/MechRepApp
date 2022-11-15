import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { MenuEmpleados, FormularioEmpleados } from "./pages";
import { PrivateLayout } from "./layouts";
import { routes } from "./routes/";

function App() {
    return (
        <Router>
            <Routes>
                {/* Solo accesible a usuarios logeados */}
                <Route path="/" element={<PrivateLayout />}>
                    <Route path={`${routes.EMPLEADOS}`}>
                        {/* Lista de empleados */}
                        <Route index element={<MenuEmpleados />} />
                        {/* Creacion de empleados */}
                        <Route
                            path={routes.CREATE}
                            element={<FormularioEmpleados />}
                        />
                    </Route>
                    <Route path={`${routes.CARGOS}`}>
                        {/* Lista de cargos */}
                        <Route index />
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
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Configuracion de react query, incializa una nueva instancia y la provee a la aplicacion
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>
);

import { useEffect } from "react";

/**
 * Hook que escucha por clicks afuera de la referencia proveida y cuando suceden llama al callback
 */
const useOutsideClickListener = (ref, callback) => {
    // Se ejecuta cada vez que la referencia cambia
    useEffect(() => {

        // Verifica si el evento fue en la referencia que es pasada
        // de no ser asi llama al callback
        const handleEvent = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Agrega el listener al documento
        document.addEventListener("mousedown", handleEvent);

        // Cuando el componente que llame a esto sea desmontado, quita el listener
        // evitando leaks de memoria
        return () => {
            document.removeEventListener("mousedown", handleEvent)
        }
    }, [ref, callback]);
};

export default useOutsideClickListener;
import { useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./ModalConfirm.css";
import { messages } from "../../assets/messages";

Modal.setAppElement("#root");

/**
 * Componente personalizado
 * de un dialogo Modal de confirmacion con un titulo,
 * una descripcion y dos botones de cancelacion y aceptacion
 */
const ModalConfirm = ({
    heading,
    question,
    onAccept,
    onCancel,
    show,
    loading,
}) => {
    // Bloquea la capacidad de hacer scrolling cuando se habre el modal
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"
        }
        // Reactivalo cuando desmontes el componente
        return () => (document.body.style.overflow = "auto");
    }, [show]);

    return (
        <Modal
            isOpen={show}
            onRequestClose={onCancel}
            overlayClassName="container__overlay"
            className="container__modal"
        >
            <h2>{heading}</h2>
            <p>{question}</p>
            <div className="container__modal-btn_row">
                <button
                    className="container__button-cancelar"
                    onClick={onCancel}
                >
                    {messages.CANCELAR}
                </button>
                <button
                    className="container__button-aceptar"
                    onClick={onAccept}
                    disabled={loading}
                >
                    {loading ? (
                        <FontAwesomeIcon icon={faSpinner} />
                    ) : (
                        messages.CONTINUAR
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default ModalConfirm;

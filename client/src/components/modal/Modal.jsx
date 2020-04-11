import React from 'react';
import { node, string } from 'prop-types';
import './Modal.css';
import ReactModal from "react-modal";

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

function Modal({
    contentClassName,
    children
}) {
    return (
        <ReactModal
            isOpen
            className={`modal-content ${contentClassName || ''}`}
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick // Not working, why?
            shouldCloseOnEsc // Not working, why?
            shouldReturnFocusAfterClose
        >
            {children}
        </ReactModal>
    );
}

Modal.propTypes = {
    contentClassName: string,
    children: node.isRequired,
};

export default Modal;
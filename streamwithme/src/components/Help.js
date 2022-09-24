import React from 'react';
import "./styles/Help.css";
import { hookstate, useHookstate } from '@hookstate/core';
import ReactModal from 'react-modal';

// In diesem Popup wird die Nutzung der Seite erklärt.

export const popupHelpStatus = hookstate(false)

const Help = () => {
    const status = useHookstate(popupHelpStatus);

    const toggle = () => { status.set(!status) }

    return (
        <ReactModal
            overlayClassName="overlay"
            className="modal-help-content"
            isOpen={status.get()}
            onRequestClose={toggle}
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
            preventScroll={true}
            contentLabel={"Popup für Hilfe"}
        >
            <h2>Funktionen erklärt</h2>
            <span >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                sanctus est Lorem ipsum dolor sit amet.

                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu
                feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
                delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,</span>
            <button className="modal-btn" onClick={toggle}>×</button>
        </ReactModal>
    );
};
export default Help;
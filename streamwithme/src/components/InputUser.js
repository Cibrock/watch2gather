import "./styles/InputUser.css";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import { roomState } from "../Room";
import { createRoom, joinRoom } from "./API/RoomAPI";
import { userState } from "../App";
import ReactModal from 'react-modal';
import { roomTitleState } from "./Navbar";
/* 
Dieses Popup erlaubt die Erstellung eines Nutzers.
Es erscheint, wenn ein Raum betreten oder erstellt wird.
Durch die Nutzung des ReactModal-Moduls ist es Barrierefrei.
 */
export const popupInputState = hookstate(false);

ReactModal.setAppElement('#root');

const InputUser = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const [name, setName] = useState("");
    const status = useHookstate(popupInputState);

    const handleInputChange = (event) => { setName(event.target.value); };
    const toggle = () => { status.set(!status.get()) }

    const submitInput = async (event) => {
        event.preventDefault();
        if(name.length() < 3) return;
        await createUser(name);
        if (roomState.get() === false) {
            const roomName = await createRoom();
            roomState.set(roomName);
            roomTitleState.set(roomName);
        }
        joinRoom(roomState.get(),userState.get())
        navigateToRoom();
        toggle();
        setName("");
    };
    return (
        <ReactModal 
            overlayClassName = "overlay"
            className = "modal-content"
            isOpen={status.get()}
            onRequestClose={toggle}
            shouldFocusAfterRender = {true}
            shouldCloseOnOverlayClick = {true} 
            shouldCloseOnEsc = {true}
            shouldReturnFocusAfterClose = {true}
            preventScroll = {true}
            contentLabel={"Popup für Nutzernameneingabe geöffnet"}
            >
            <h2 className="modal-h2">Bitte erstellen Sie einen Nutzer um Räumen beitreten zu können</h2>
            <form onSubmit={submitInput} className="input-user-grid">
                <label htmlFor="UserName" className="input-user-label">
                    Name eingeben
                </label>
                <input
                    className="input-user-input"
                    name="UserName"
                    type="name"
                    id="UserName"
                    value={name}
                    placeholder="Name"
                    maxLength = "20"
                    minLength="3"
                    autoComplete="off"
                    onChange={handleInputChange} />
                <input className="input-user-submit" type="submit" value="Bestätigen"/>
            </form>
            <button className = "modal-btn " onClick={toggle}>×</button>
        </ReactModal>
    );
};
export default InputUser;
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
ReactModal.setAppElement('#root');

export const popupInputState = hookstate(false);

const InputUser = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const [name, setName] = useState("");
    const status = useHookstate(popupInputState);

    const handleInputChange = (event) => { setName(event.target.value); };
    const toggle = () => { status.set(!status.get()) }

    const submitInput = async (event) => {
        event.preventDefault();
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
            <div className = "modal-content">
                <h2 className="modal-h2">Bitte erstellen Sie einen Nutzer um Räumen beitreten zu können</h2>
                <form onSubmit={submitInput}>
                    <label htmlFor="UserName" className="input-user-label">
                        Name eingeben
                    </label>
                    <input
                        name="UserName"
                        type="name"
                        id="UserName"
                        value={name}
                        placeholder="Name"
                        maxLength = "20"
                        onChange={handleInputChange} />
                    <input type="submit" value="Bestätigen"/>
                </form>
                <button className = "modal-btn" onClick={toggle}>×</button>
            </div>
        </ReactModal>
    );
};
export default InputUser;
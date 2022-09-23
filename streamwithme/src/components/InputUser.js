import "./styles/InputUser.css";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import { roomState } from "../Room";
import { joinRoom } from "./API/RoomAPI";
import { userState } from "../App";

export const popupInputState = hookstate(false);

const InputUser = () => {
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);
    const [name, setName] = useState("");
    const status = useHookstate(popupInputState);

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setName(event.target.value);
    };

    const toggle = () => {
        status.set(!status.get())
    }

    const submitInput = async (event) => {
        event.preventDefault();
        await createUser(name);
        if (roomState.get() !== false) {
            joinRoom(roomState.get(),userState.get())
            navigateToRoom();
        }
        toggle();
        setName("");
    };

    return (status.get()) && (
        <div className="modal" role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc">
            <div className="overlay" onClick={toggle}></div>
            <div className="modal-content">
                <p id="dialog1Desc" className='accessibility'>Ein Popup zur Nutzernameneingabe hat sich geöffnet, Sie können es jederzeit mit der ESC taste schliessen</p>
                <h2 id="dialog1Title" className="modal-h2">Bitte erstellen Sie einen Nutzer um Räumen beitreten zu können</h2>
                <button className = "modal-btn" onClick={toggle}>×</button>
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
            </div>
        </div>
    );
};
export default InputUser;
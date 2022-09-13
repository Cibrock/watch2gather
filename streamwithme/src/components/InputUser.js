import "./styles/InputUser.css";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import { roomState } from "../Room";

export const popupState = hookstate(false);

const InputUser = () => {
    const [name, setName] = useState("");
    const status = useHookstate(popupState);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setName(event.target.value);
    };

    const toggle = () => {
        status.set(!status.get())
    }

    const submitInput = async (event) => {
        createUser(name);
        setName("");
        toggle();
        if (roomState.get() !== false) navigateToRoom();
        event.preventDefault();
    };

    return (status.get()) && (
        <div className="modal">
            <div className="overlay" onClick={toggle}></div>
            <div className="modal-content">
                <h2 className="modal-h2">Bitte erstellen Sie einen Nutzer um Räumen beitreten zu können</h2>
                <button className = "modal-btn" onClick={toggle}>×</button>
                <form onSubmit={submitInput}>
                    <label htmlFor="UserName">
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
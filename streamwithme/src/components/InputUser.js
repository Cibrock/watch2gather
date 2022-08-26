import "./styles/InputUser.css";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import { setRoom } from "../Room";

export const setPopup = hookstate(false);

const InputUser = () => {
    const [name, setName] = useState("");
    const status = useHookstate(setPopup);
    const navigate = useNavigate();
    const navigateToRoom = useCallback(() => navigate("/Room", { replace: true }), [navigate]);

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setName(event.target.value);
    };

    const submitInput = async (event) => {
        createUser(name);
        setName("");
        status.set(false);
        console.log(setRoom.get());
        if (setRoom.get() !== false) navigateToRoom();
        event.preventDefault();
    };

    return (status.get()) && (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <h2>Bitte erstellen Sie einen Nutzer um Räumen beitreten zu können</h2>
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
                            onChange={handleInputChange} />
                        <input type="submit" value="Bestätigen" />
                    </form>
                </div>
            </div>
        </div>
    );
};
export default InputUser;
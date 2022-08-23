import React, { useState } from "react";
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import "./styles/InputUser.css";

export const openPopup = hookstate(false)

const InputUser = () => {
    const [name, setName] = useState("");
    const PopUpState = useHookstate(openPopup)
    
    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setName(event.target.value);
    };

    const submitInput = async (event) => {
        createUser(name);
        setName("");
        PopUpState.set(false);
        event.preventDefault();
    };
    
    return (PopUpState.get()) ? (
        <div>
            <form onSubmit={submitInput}>
                <label htmlFor="UserName">
                    Name eingeben
                </label>
                <input
                    name="UserName"
                    type="name"
                    id="UserName"
                    value={name}
                    placeholder="Nickname"
                    onChange={handleInputChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    ) : null;
};
export default InputUser;
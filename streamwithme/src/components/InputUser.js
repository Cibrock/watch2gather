import React, { useState } from "react";
import { createUser } from "./API/UserAPI";
import { hookstate, useHookstate } from '@hookstate/core';
import "./styles/InputUser.css";

export const openPopup = hookstate(false)

const InputUser = (props) => {
    const [name, setName] = useState("");
    const [trigger, setTrigger] = useState((props.trigger === undefined) ? false : props.trigger);

    const PopUpState = useHookstate(openPopup)

    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setName(event.target.value);
    };

    const submitInput = async (event) => {
        createUser(name);
        //Set Trigger false, make this invisible
        setName("");
        setTrigger(true);
        PopUpState.set(false);
        event.preventDefault();
    };
    
    return (PopUpState.get() && trigger) ? (
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
    ) : null;
};
export default InputUser;
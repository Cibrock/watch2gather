import React, { useState } from "react";
import { userState } from "../App";
import { roomState } from "../Room";
import { sendMessage } from "./API/ChatAPI";
import "./styles/ChatInput.css"


const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const roomName = roomState.get();
    const user = userState.get();
    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setNewMessage(event.target.value);
    };

    const submitInput = async (event) => {
        event.preventDefault();
        await sendMessage(roomName, user, newMessage);
        setNewMessage("");
    };

    return (
        <form onSubmit={submitInput}>
            <label className="chat-input-label" htmlFor="chatMessage">
                Nachricht eingeben
            </label>
            <input
                name="chatMessage"
                type="text"
                id="chatMessage"
                value={newMessage}
                placeholder="Neue Nachricht"
                maxLength="50"
                autoComplete="off"
                onChange={handleInputChange}/>
        </form>
    );
};


export default ChatInput;
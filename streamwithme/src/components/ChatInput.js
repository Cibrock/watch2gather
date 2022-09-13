import React, { useState } from "react";
import { user } from "../App";
import { roomState } from "../Room";
import { sendMessage } from "./API/ChatAPI";

const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const roomName = roomState.get();
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
            <label htmlFor="chatMessage">
                Nachricht eingeben
            </label>
            <input
                name="chatMessage"
                type="text"
                id="chatMessage"
                value={newMessage}
                placeholder="Neue Nachricht"
                onChange={handleInputChange} />
            <input type="submit" value="Senden" />
        </form>
    );
};


export default ChatInput;
import React, { useState } from "react";
import { userState } from "../App";
import { roomState } from "../Room";
import { sendMessage } from "./API/ChatAPI";
import "./styles/ChatInput.css"

// Hiermit können Nachrichten in den Chat gesendet werden.

const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const roomName = roomState.get();
    const user = userState.get();
    
    const handleInputChange = (event) => { setNewMessage(event.target.value); };
    const submitInput = async (event) => {
        event.preventDefault();
        await sendMessage(roomName, user, newMessage);
        setNewMessage("");
    };

    return (
        <form className="chat-form" onSubmit={submitInput}>
            <label className="chat-input-label" htmlFor="chatMessage">
                Nachricht eingeben
            </label>
            <input
                name="chatMessage"
                type="text"
                id="chatMessage"
                value={newMessage}
                placeholder="Neue Nachricht"
                maxLength="500"
                autoComplete="off"
                minLength="1"
                onChange={handleInputChange}/>
        </form>
    );
};


export default ChatInput;
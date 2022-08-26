import React, { useState } from "react";
import { user } from "../App";
import { setRoom } from "../Room";
import { getChat, sendMessage } from "./API/ChatAPI";
import { setNewestMessage } from "./Chat";

const ChatInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const roomName = setRoom.get()
    const handleInputChange = (event) => {
        //Update the shown text whilst typing
        setNewMessage(event.target.value);
    };

    const submitInput = async (event) => {
        sendMessage(roomName,user, newMessage)
        setNewMessage("");
        event.preventDefault();
        const data = await getChat(roomName)
        const messages = data.messages
        console.log(messages);
        setNewestMessage.set(messages[0].id)
        event.preventDefault();
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
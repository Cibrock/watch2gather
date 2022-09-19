import React, { useEffect, useState } from "react";
import { roomState } from "../Room";
import { getChat } from "./API/ChatAPI";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./styles/Chat.css";

const MAX_MESSAGES = 10;

const Chat = () => {
    const roomName = roomState.get();
    const [displayed,setDisplayed] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            await shownMessages();
        }, 3000 );
        return () => clearInterval(interval);
    });

    const shownMessages = async () => {
        const out = [];
        const data = await getChat(roomName);
        const messages = data.messages;
        if (messages === undefined) return;
        if (messages.length < MAX_MESSAGES) { 
            setDisplayed(messages);
            return;
        }
        for (let i = messages.length - MAX_MESSAGES; i < messages.length; i++) {
            out.push({
                id: messages[i].id,
                time: messages[i].time,
                text: messages[i].text,
                userId: messages[i].userId
            });
        }
        setDisplayed(out);
    };

    return (
        <div className="flex-chat">
            <h2 className='chat-header'>Chat</h2>
            <ul className='chat-list' aria-label="Chat" aria-live="polite">
                {displayed.map(m => (<ChatMessage key={m.id} time={m.time} text={m.text} id={m.userId} />))}
            </ul>
            <div className="chat-input"> <ChatInput /> </div>
        </div>
    );
};

export default Chat;
import React, { useEffect, useRef, useState } from "react";
import { roomState } from "../Room";
import { getChat } from "./API/ChatAPI";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./styles/Chat.css";
import { getUsers } from "./API/UserAPI";
const Chat = () => {
    const roomName = roomState.get();
    const [displayed, setDisplayed] = useState([]);
    const endRef = useRef(null);
    const [lastCount, setLastCount] = useState(0);

    const scrollToBottom = () => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (lastCount < displayed.length) {
            setLastCount(displayed.length);
            scrollToBottom();
        }
        const interval = setInterval(async () => { await shownMessages();}, 3000);
        return () => clearInterval(interval);
    });

    const shownMessages = async () => {
        const data = await getChat(roomName);
        const messages = data.messages;
        if (messages === undefined) return;
        const data2 = await getUsers();
        const list = data2.users;
        messages.forEach((message)=>{
            const user = list.find((element) => { return message.userId === element.id; })
            const name = user ? user.name : "[deleted]"
            message.user = name;
        })
        setDisplayed(messages);
    };

    return (
        <div className="flex-chat" >
            <h2 className='chat-header'>Chat</h2>
            <div className='chat-list' role="list" aria-label="Chat" aria-live="polite" tabIndex="0" onFocus={scrollToBottom}>
                {displayed.map(m => (<ChatMessage key={m.id} time={m.time} text={m.text} name={m.user} />))}
                <div ref={endRef} />
            </div>
            <div className="chat-input"> <ChatInput /> </div>
        </div>
    );
};

export default Chat;
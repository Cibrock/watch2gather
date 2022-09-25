import React, { useEffect, useRef, useState } from "react";
import { roomState } from "../Room";
import { getChat } from "./API/ChatAPI";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./styles/Chat.css";
import { getUsers } from "./API/UserAPI";

/* Dieses Element umfasst den Chat, als auch die Eingabefläche.
Die API wird regelmäßig auf neue Nachrichten angefragt.
Beim ersten Laden und bei neuen Nachrichten wird nach unten gescrollt.
Falls eine Nachricht keinem Nutzer zugewiesen werden kann(meist: Nutzer wurde gelöscht)
so wird dies angezeigt. 
*/ 

const Chat = () => {
    const roomName = roomState.get();
    const [displayed, setDisplayed] = useState([]);
    const endRef = useRef();
    const [lastCount, setLastCount] = useState(0);

    const scrollToBottom = () => endRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {
        if (lastCount < displayed.length) {
            setLastCount(displayed.length);
            scrollToBottom();
        }
        const interval = setInterval(async () => { await shownMessages();}, 1000);
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
            const name = user ? user.name : "[gelöscht]"
            message.user = name;
        })
        setDisplayed(messages);
    };

    return (
        <>
            <h2 className='chat-header'>Chat</h2>
            <div className='chat-list' role="list" aria-label="Chat" aria-live="polite" tabIndex="0" onFocus={scrollToBottom}>
                {displayed.map((m) => <ChatMessage key={m.id} time={m.time} text={m.text} name={m.user}/> )}
            </div>
            <div className="chat-input"> <ChatInput /> </div>
            <div ref={endRef}/>
        </>
    );
};

export default Chat;
import React, { useEffect, useState } from "react";
import { getUsers } from "./API/UserAPI";
import "./styles/ChatMessage.css";

const ChatMessage = (props) => {
    const [text] = useState(props.text);
    const [time, setTime] = useState(props.time);
    const [name] = useState(props.name);

    useEffect(() => {
        let date = new Date(null);
        if (typeof (time) === "string") return;
        date.setMilliseconds(time);
        setTime(date.toISOString().substring(11, 16));
    });

    return (
        <div className="messages"  role="listitem">
            <span className="accessibility">Neue Nachricht</span>
            <span className="messageTime">{time}</span>
            <span className="messageUser">{name}:</span>
            <span className="messageText">{text}</span>
        </div>
    );
};

export default ChatMessage;
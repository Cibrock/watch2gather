import React, { useEffect, useState } from "react";
import "./styles/ChatMessage.css";

const ChatMessage = React.forwardRef((props,ref) => {
    const [text] = useState(props.text);
    const propTime = props.time
    const [time, setTime] = useState();
    const [name] = useState(props.name);

    useEffect(() => {
        if (time !== undefined) return;
        const date = new Date(null);
        date.setMilliseconds(propTime);
        setTime(date.toISOString().substring(11, 16));
    });

    return (
        <div className="messages" role="listitem" ref={ref}>
            <span className="accessibility">Neue Nachricht</span>
            <span className="messageTime">{time}</span>
            <span className="messageUser">{name}:</span>
            <span className="messageText">{text}</span>
        </div>
    );
});

export default ChatMessage;
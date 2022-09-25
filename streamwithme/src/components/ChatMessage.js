import React, { useEffect, useState } from "react";
import { eventState } from "./EventHandler";
import "./styles/ChatMessage.css";
/* 
Hier werden die Nachrichten aus API sinnvoll dargestellt.
Die Zeit ist auf die Stunden und Minuten gekürzt.
(Die Zeitzone definiert Herr Barths Server, welche 3 Stunden nachgeht.)
Da Räume als flüchtig konzipiert sind, entfällt das Datum.
Durch den accessibility Span liest der Screenreader neue Nachrichten vor.
 */
const ChatMessage = React.forwardRef((props,ref) => {
    const [text] = useState(props.text);
    const propTime = props.time
    const [time, setTime] = useState();
    const [name] = useState(props.name);

    useEffect(() => {
        if (time !== undefined) return;
        eventState.set("NewMessage");
        const date = new Date(null);
        date.setMilliseconds(propTime);
        setTime(date.toISOString().substring(11, 16));
    });

    return (
        <div className="messages" role="listitem" ref={ref}>
            <span className="messageTime">{time}</span>
            <span className="messageUser">{name}:</span>
            <span className="messageText">{text}</span>
        </div>
    );
});

export default ChatMessage;
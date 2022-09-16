import React, { useEffect, useState } from "react";
import { getUsers } from "./API/UserAPI";
import "./styles/ChatMessage.css";

const ChatMessage = (props) => {
    const [text] = useState(props.text);
    const [time, setTime] = useState(props.time);
    const [id] = useState(props.id);
    const [user, setUser] = useState("");

    useEffect(() => {
        getUsername();
        let date = new Date(null);
        if (typeof (time) === "string") return;
        date.setMilliseconds(time);
        let result = date.toISOString();
        let resultsub = result.substring(11, 16);
        setTime(resultsub);
    });

    const getUsername = async () => {
        const data = await getUsers();
        const list = data.users;
        const result = list.find((element) => { return id === element.id; });
        setUser(result ? result.name : "[deleted]");
    };

    return (
        <li className="messages">
            <span className="messageTime">{time}</span>
            <span className="messageUser">{user}:</span>
            <span className="messageText">{text}</span>
        </li>
    );
};

export default ChatMessage;
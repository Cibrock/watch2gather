import React, { useEffect, useState } from "react";
import { getUsers } from "./API/UserAPI";
import "./styles/ChatMessage.css";

const ChatMessage = (props) => {
    const [text] = useState(props.text);
    const [time, setTime] = useState(props.time);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        getUsername(user);
        let date = new Date(null)
        if(typeof(time) === "string") return;
        date.setMilliseconds(time)
        let result = date.toISOString()
        let resultsub = result.substring(11, 19)
        setTime(resultsub)
    });

    const getUsername = async (target) => {
        const data = await getUsers();
        const list = data.users;
        let name = "no name found";
        const result = list.find( (id) => { return toString(target) === toString(id) } )
        setUser(result.name || name);
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
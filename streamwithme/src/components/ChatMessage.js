import React, { useEffect, useState } from "react";
import { getUsers } from "./API/UserAPI";

const ChatMessage = (props) => {
    const [text] = useState(props.text);
    const [time] = useState(props.time);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        getUsername(user);
    });

    const getUsername = async (id) => {
        const data = await getUsers();
        const list = data.users
        for (let i = 0; i < list.length; i++) {
            if (toString(list[i].id) == toString(id)) {
                setUser(list[i].name);
                return
            }
        }
        setUser("no Name found");
    };

    return (
        <li>
            <p>{time}</p>
            <p>{user}</p>
            <p>{text}</p>
        </li>
    );
};

export default ChatMessage;
import React, { useEffect, useState } from "react";
import { getUsers } from "./API/UserAPI";
import "./styles/ChatMessage.css";

const ChatMessage = (props) => {
    const [text] = useState(props.text);
    const [time, setTime] = useState(props.time);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        getUsername(user);
        // setTime(new Date(time).toISOString().substring(11, 8))
      let date = new Date(null)  
      console.log(typeof(time));
      if(typeof(time) == "string")
      return;
      date.setMilliseconds(time)
      let result = date.toISOString()
      let resultsub = result.substring(11, 19)
      setTime(resultsub)
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
        <li className="messages">
            <span className="messageTime">{time}</span>
            <span className="messageUser">{user}:</span>
            <span className="messageText">{text}</span>
        </li>
    );
};

export default ChatMessage;
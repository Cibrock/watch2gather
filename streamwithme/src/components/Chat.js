import React, { useState } from "react";
import Async from "react-async";
import { getChat } from "./API/ChatAPI";

const Chat = (props) => {
    const [startMessage,setStartMessage] = useState();
    const shownMessages = (messages) => {
        const out = [];
        const l = messages.length;
        for(i=0;i<10;i++){
            out.push({
                id:   messages[l-i].id,
                time: messages[l-i].time,
                text: messages[l-i].text, 
                user: messages[l-i].userId})
        }
        console.log(out);
        return out;
    };

    const getLastTen = async () => { return await getChat(startMessage || "") }

    return (
        <Async promiseFn={getLastTen}>
            {({ data, error, isLoading }) => {
                if (isLoading) return "Loading...";
                if (error) return 'Something went wrong: ' + error.message;
                if (data)
                    return (
                        <div className="flex-chat">
                            <div className='roomlist_container'>
                                <ul className='roomlist' aria-label="Räume">
                                    {shownMessages(data.messages).map(m => (<ChatMessage key={m.id} time={m.time} text={m.text} user={m.user} />))}
                                </ul>
                            </div>
                        </div>
                    );
                return null;
            }}
        </Async>
    );
};

export default Chat;
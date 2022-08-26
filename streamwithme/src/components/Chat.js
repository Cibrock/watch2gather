import React, { useState } from "react";
import Async from "react-async";
import { setRoom } from "../Room";
import { getChat } from "./API/ChatAPI";
import ChatMessage from "./ChatMessage";

const Chat = (props) => {
    const [startMessage, setStartMessage] = useState();
    const shownMessages = (messages) => {
        const out = [];
        if (messages === undefined) return out;
        if (messages.length < 10) return messages;
        for (let i = messages.length; i >= 0; i--) {
            out.push({
                id: messages[i].id,
                time: messages[i].time,
                text: messages[i].text,
                userId: messages[i].userId
            });
        }
        console.log(out);
        return out;
    };
    const roomName = setRoom.get();
    const getLastTen = async () => {
        return await getChat(roomName, startMessage);
    };

    return (
        <Async promiseFn={async () => { return getChat(roomName); }}>
            {({ data, error, isLoading }) => {
                if (isLoading) return "Loading...";
                if (error) return 'Something went wrong: ' + error.message;
                if (data)
                return (
                    <div className="flex-chat">
                        <div className='chat_container'>
                            <ul className='chat' aria-label="Chat">
                                {shownMessages(data.messages).map(m => (<ChatMessage key={m.id} time={m.time} text={m.text} user={m.userId} />))}
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
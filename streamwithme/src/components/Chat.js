import React from "react";
import Async from "react-async";
import { roomState } from "../Room";
import { getChat } from "./API/ChatAPI";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { hookstate, useHookstate } from '@hookstate/core';
import "./styles/Chat.css"

export const setNewestMessage = hookstate("");

const Chat = () => {
    const newestMessage = useHookstate(setNewestMessage);
    const roomName = roomState.get();

    const shownMessages = (messages) => {
        const out = [];
        if (messages === undefined) return out;
        if (messages.length < 10) return messages;
        for (let i = messages.length-10; i < messages.length; i++) {
            out.push({
                id: messages[i].id,
                time: messages[i].time,
                text: messages[i].text,
                userId: messages[i].userId
            });
        }
        return out;
    };

    return (
        <Async promiseFn={async () => { return getChat(roomName); }}>
            {({ data, error, isLoading }) => {
                if (isLoading) return "Loading...";
                if (error) return 'Something went wrong: ' + error.message;
                if (data)
                    return (
                        <div className="flex-chat">
                            <ul className='chat-list' aria-label="Chat">
                                {shownMessages(data.messages).map(m => (<ChatMessage key={m.id} time={m.time} text={m.text} user={m.userId} />))}
                                <li className="chat-input">
                                    <ChatInput/>
                                </li>
                            </ul>
                        </div>
                    );
                return null;
            }}
        </Async>
    );
};

export default Chat;
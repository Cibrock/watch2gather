import React, { useState, useEffect, useRef } from 'react';
import './styles/UserList.css';
import { getRoomUsers } from './API/RoomAPI';
import { roomState } from '../Room';

const UserListElement = (props) => {
    const [name] = useState(props.name);
    return (
        <div className='user-element' role="listitem">
            {name}
        </div>
    );
};

const UserList = () => {
    const roomName = roomState.get();
    const [displayed, setDisplayed] = useState([]);
    const endRef = useRef(null);
    const [lastCount, setLastCount] = useState(0);

    const scrollToBottom = () => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (lastCount < displayed.length) {
            setLastCount(displayed.length);
            scrollToBottom();
        }
        const interval = setInterval( async () => { await shownUsers(); }, 3000);
        return () => clearInterval(interval);
    });

    const shownUsers = async () => {
        const data = await getRoomUsers(roomName);
        const users = data.users;
        if (users === undefined) return;
        setDisplayed(users);
    };

    return (
        <div className="flex-user-list">
            <h2 className='user-list-header'>Users</h2>
            <div className='user-list' role="list" aria-label="User">
                {displayed.map(user => (<UserListElement name={user.name} key={user.id} />))}
                <div ref={endRef} />
            </div>
        </div>
    );
};

export default UserList;
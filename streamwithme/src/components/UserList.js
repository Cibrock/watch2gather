import React, { useState, useEffect } from 'react';
import './styles/UserList.css';
import { getRoomUsers } from './API/RoomAPI';
import { roomState } from '../Room';
/* 
Jedes Element soll nur den Namen zeigen. 
Der accessibility span dient der Barrierefreiheit. 
Er wird von ScreenReader als Benachrichtigung gelesen.
 */
const UserListElement = (props) => {
    const [name] = useState(props.name);
    return (
        <div className='user-element' role="listitem">
            <span className="accessibility">Neuer User</span>
            {name}
        </div>
    );
};

// Die UserList zeigt alle im Raum befindlichen Nutzer an.

const UserList = () => {
    const roomName = roomState.get();
    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        const interval = setInterval( async () => { await shownUsers(); }, 1000);
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
            <div className='user-list' role="list" aria-label="User" aria-live="polite">
                {displayed.map(user => (<UserListElement name={user.name} key={user.id} />))}
            </div>
        </div>
    );
};

export default UserList;